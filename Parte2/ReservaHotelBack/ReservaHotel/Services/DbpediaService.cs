using System.Net.Http;
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
            }

            public async Task<List<Hotel>> GetHotelsAsync(int limit = 10)
            {
                var query = $@"
                    SELECT ?hotel ?label ?lat ?long WHERE {{
                    ?hotel a dbo:Hotel ;
                            geo:lat ?lat ;
                            geo:long ?long ;
                            rdfs:label ?label .
                    FILTER(lang(?label) = 'en')
                    }} LIMIT {limit}";

                var encodedQuery = HttpUtility.UrlEncode(query);
                var url = $"{Endpoint}?query={encodedQuery}&format=application/sparql-results+json";

                var response = await _httpClient.GetStringAsync(url);
                using var jsonDoc = JsonDocument.Parse(response);
                var bindings = jsonDoc.RootElement.GetProperty("results").GetProperty("bindings");

                var hotels = new List<Hotel>();
                foreach (var item in bindings.EnumerateArray())
                {
                    hotels.Add(new Hotel
                    {
                        Name = item.GetProperty("label").GetProperty("value").GetString(),
                        Uri = item.GetProperty("hotel").GetProperty("value").GetString(),
                        Latitude = double.Parse(item.GetProperty("lat").GetProperty("value").GetString()),
                        Longitude = double.Parse(item.GetProperty("long").GetProperty("value").GetString())
                    });
                }

                return hotels;
            }
        }

}