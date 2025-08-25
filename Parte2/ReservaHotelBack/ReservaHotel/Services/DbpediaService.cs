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

            _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("ReservaHotel/1.0 (+https://localhost)");
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/sparql-results+json"));
        }

        public async Task<List<Hotel>> GetHotelsAsync(int limit = 500, CancellationToken ct = default)
        {
            // Consulta enxuta: hotel, label, lat, long, cidade e thumbnail
            var query = $@"
PREFIX dbo:  <http://dbpedia.org/ontology/>
PREFIX geo:  <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?hotel ?label ?lat ?long ?cityLabel ?thumb WHERE {{
  ?hotel a dbo:Hotel ;
         geo:lat ?lat ;
         geo:long ?long ;
         rdfs:label ?label ;
         dbo:city ?city ;
         dbo:thumbnail ?thumb .

  ?city rdfs:label ?cityLabel .

  FILTER(langMatches(lang(?label), 'EN'))
  FILTER(langMatches(lang(?cityLabel), 'EN'))
}}
LIMIT {limit}";

            using var form = new FormUrlEncodedContent(new[]
            {
        new KeyValuePair<string,string>("query", query),
        new KeyValuePair<string,string>("format", "application/sparql-results+json")
    });

            var sw = System.Diagnostics.Stopwatch.StartNew();

            using var req = new HttpRequestMessage(HttpMethod.Post, Endpoint) { Content = form };
            using var resp = await _httpClient.SendAsync(req, HttpCompletionOption.ResponseHeadersRead, ct);
            resp.EnsureSuccessStatusCode();

            await using var stream = await resp.Content.ReadAsStreamAsync(ct);
            using var doc = await JsonDocument.ParseAsync(stream, cancellationToken: ct);
            var bindings = doc.RootElement.GetProperty("results").GetProperty("bindings");

            static string? G(JsonElement e, string prop)
                => e.TryGetProperty(prop, out var p) && p.TryGetProperty("value", out var v) ? v.GetString() : null;

            var hotels = new List<Hotel>();
            foreach (var item in bindings.EnumerateArray())
            {
                var latStr = G(item, "lat") ?? "0";
                var longStr = G(item, "long") ?? "0";
                double.TryParse(latStr, NumberStyles.Any, CultureInfo.InvariantCulture, out var lat);
                double.TryParse(longStr, NumberStyles.Any, CultureInfo.InvariantCulture, out var lng);

                hotels.Add(new Hotel
                {
                    Name = G(item, "label") ?? string.Empty,
                    Uri = G(item, "hotel") ?? string.Empty,
                    Latitude = lat,
                    Longitude = lng,
                    City = G(item, "cityLabel") ?? string.Empty,
                    // Só o que pedimos; se sua classe tiver outros campos, deixe em branco:
                    Thumbnail = G(item, "thumb") ?? string.Empty,
                    Country = string.Empty
                });
            }

            sw.Stop();
            _logger.LogInformation("DBpedia retornou {Count} hotéis em {Elapsed} ms.", hotels.Count, sw.ElapsedMilliseconds);

            return hotels;
        }

        public async Task<List<Restaurant>> GetRestaurantsAsync(
            int limit = 100,
            CancellationToken ct = default)
        {
            var query = $@"
PREFIX dbo:    <http://dbpedia.org/ontology/>
PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#>
PREFIX foaf:   <http://xmlns.com/foaf/0.1/>
PREFIX schema: <http://schema.org/>

SELECT ?city ?cityLabel ?name ?thumb
WHERE {{
  ?restaurant a dbo:Restaurant ;
              rdfs:label ?name ;
              (dbo:thumbnail|foaf:depiction|schema:thumbnailUrl) ?thumb ;
              (dbo:locationCity|dbo:city) ?city .
  FILTER (lang(?name) = 'en')

  ?city rdfs:label ?cityLabel .
  FILTER (lang(?cityLabel) = 'en')
}}
LIMIT {limit}";

            using var form = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string,string>("query", query),
                new KeyValuePair<string,string>("format", "application/sparql-results+json")
            });
            using var req = new HttpRequestMessage(HttpMethod.Post, Endpoint) { Content = form };

            using var resp = await _httpClient.SendAsync(req, ct);
            resp.EnsureSuccessStatusCode();

            var json = await resp.Content.ReadAsStringAsync(ct);
            using var doc = JsonDocument.Parse(json);

            var results = new List<Restaurant>();
            var bindings = doc.RootElement
                              .GetProperty("results")
                              .GetProperty("bindings");

           foreach (var b in bindings.EnumerateArray())
            {
                var name    = b.GetProperty("name").GetProperty("value").GetString() ?? "";
                var cityUri = b.GetProperty("city").GetProperty("value").GetString() ?? "";
                var thumb   = b.GetProperty("thumb").GetProperty("value").GetString() ?? "";

                string? cityLabel = null;
                if (b.TryGetProperty("cityLabel", out var cl) &&
                    cl.TryGetProperty("value", out var v))
                {
                    cityLabel = v.GetString();
                }
                
                results.Add(new Restaurant
                {
                    Name     = name,
                    Uri      = cityUri, 
                    City     = cityLabel,   // agora guarda a URI da CIDADE
                    ImageUrl = thumb       // da variável ?thumb da consulta
                });
            }

            return results;
        }
    }
}
