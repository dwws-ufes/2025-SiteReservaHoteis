using System.Globalization;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Web;
using ReservaHotel.Entities;
using Microsoft.Extensions.Logging; // <-- logger

namespace ReservaHotel.Services
{
    public class DbpediaService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<DbpediaService> _logger; // <-- logger
        private const string Endpoint = "https://dbpedia.org/sparql";

        public DbpediaService(HttpClient httpClient, ILogger<DbpediaService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;

            _httpClient.Timeout = TimeSpan.FromSeconds(30);
            _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("ReservaHotel/1.0 (+https://localhost)");
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/sparql-results+json"));
        }

        public async Task<List<Hotel>> GetHotelsAsync(int limit = 1000, CancellationToken ct = default)
        {
            var query = $@"
PREFIX dbo:  <http://dbpedia.org/ontology/>
PREFIX geo:  <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?hotel ?label ?lat ?long ?cityLabel ?countryLabel ?desc ?thumb ?homepage WHERE {{
  ?hotel a dbo:Hotel ;
         geo:lat ?lat ;
         geo:long ?long ;
         rdfs:label ?label .

  OPTIONAL {{ ?hotel dbo:city ?city . ?city rdfs:label ?cityLabel . FILTER(lang(?cityLabel) = 'en') }}
  OPTIONAL {{ ?hotel dbo:country ?country . ?country rdfs:label ?countryLabel . FILTER(lang(?countryLabel) = 'en') }}
  OPTIONAL {{ ?hotel dbo:abstract ?desc . FILTER(lang(?desc) = 'en') }}
  OPTIONAL {{ ?hotel dbo:thumbnail ?thumb }}
  OPTIONAL {{ ?hotel foaf:homepage ?homepage }}

  FILTER(lang(?label) = 'en')
}}
LIMIT {limit}";

            var url = $"{Endpoint}?query={HttpUtility.UrlEncode(query)}&format=application%2Fsparql-results%2Bjson";

            using var req = new HttpRequestMessage(HttpMethod.Get, url);
            req.Headers.Accept.Clear();
            req.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/sparql-results+json"));
            req.Headers.UserAgent.ParseAdd("ReservaHotel/1.0 (+https://localhost)");

            using var resp = await _httpClient.SendAsync(req, ct);
            resp.EnsureSuccessStatusCode();

            var json = await resp.Content.ReadAsStringAsync(ct);

            // Imprimir no console e no logger
            //Console.WriteLine(json);
            _logger.LogInformation("DBpedia raw response (first 2KB): {Raw}",
                json.Length > 2048 ? json.Substring(0, 2048) + "..." : json);

            using var doc = JsonDocument.Parse(json);
            var bindings = doc.RootElement.GetProperty("results").GetProperty("bindings");

            var hotels = new List<Hotel>();
            foreach (var item in bindings.EnumerateArray())
            {
                // Helpers seguros
                static string? G(JsonElement e, string prop)
                    => e.TryGetProperty(prop, out var p) && p.TryGetProperty("value", out var v) ? v.GetString() : null;

                var name = G(item, "label") ?? string.Empty;
                var uri  = G(item, "hotel") ?? string.Empty;

                var latStr  = G(item, "lat")  ?? "0";
                var longStr = G(item, "long") ?? "0";
                double.TryParse(latStr, NumberStyles.Any, CultureInfo.InvariantCulture, out var lat);
                double.TryParse(longStr, NumberStyles.Any, CultureInfo.InvariantCulture, out var lng);

                var city        = G(item, "cityLabel") ?? string.Empty;
                var country     = G(item, "countryLabel") ?? string.Empty;
                var description = G(item, "desc") ?? string.Empty;
                var thumb       = G(item, "thumb") ?? string.Empty;
                var homepage    = G(item, "homepage") ?? string.Empty;

                hotels.Add(new Hotel
                {
                    Name        = name,
                    Uri         = uri,
                    Latitude    = lat,
                    Longitude   = lng,
                    City        = city,
                    Country     = country,
                    Description = description,
                    Thumbnail   = thumb,
                    Homepage    = homepage
                });
            }

            return hotels;
        }
    }
}
