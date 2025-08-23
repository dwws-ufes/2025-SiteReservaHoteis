using System.Globalization;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Web;
using ReservaHotel.Entities;

namespace ReservaHotel.Services
{
    public class DbpediaService
    {
        private readonly HttpClient _httpClient;
        private const string Endpoint = "https://dbpedia.org/sparql";

        public DbpediaService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.Timeout = TimeSpan.FromSeconds(30);
            // Cabeçalhos default
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
SELECT ?hotel ?label ?lat ?long WHERE {{
  ?hotel a dbo:Hotel ;
         geo:lat ?lat ;
         geo:long ?long ;
         rdfs:label ?label .
  FILTER(lang(?label) = 'en')
}}
LIMIT {limit}";

            var url = $"{Endpoint}?query={HttpUtility.UrlEncode(query)}&format=application%2Fsparql-results%2Bjson";

            using var req = new HttpRequestMessage(HttpMethod.Get, url);
            // (opcional) reforça Accept por requisição
            req.Headers.Accept.Clear();
            req.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/sparql-results+json"));
            req.Headers.UserAgent.ParseAdd("ReservaHotel/1.0 (+https://localhost)");

            using var resp = await _httpClient.SendAsync(req, ct);
            resp.EnsureSuccessStatusCode(); // evitar 406/4xx passarem batido

            var json = await resp.Content.ReadAsStringAsync(ct);

            //— debug: imprimir resposta crua no console
            //Console.WriteLine(json);

            using var doc = JsonDocument.Parse(json);
            var bindings = doc.RootElement.GetProperty("results").GetProperty("bindings");

            var hotels = new List<Hotel>();
            foreach (var item in bindings.EnumerateArray())
            {
                var name = item.GetProperty("label").GetProperty("value").GetString() ?? "";
                var uri = item.GetProperty("hotel").GetProperty("value").GetString() ?? "";

                // usar cultura invariável para parse de ponto decimal
                var latStr = item.GetProperty("lat").GetProperty("value").GetString() ?? "0";
                var longStr = item.GetProperty("long").GetProperty("value").GetString() ?? "0";
                double.TryParse(latStr, NumberStyles.Any, CultureInfo.InvariantCulture, out var lat);
                double.TryParse(longStr, NumberStyles.Any, CultureInfo.InvariantCulture, out var lng);

                hotels.Add(new Hotel
                {
                    Name = name,
                    Uri = uri,
                    Latitude = lat,
                    Longitude = lng
                });
            }

            return hotels;
        }
    }
}
