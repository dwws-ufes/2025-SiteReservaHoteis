using Microsoft.AspNetCore.Mvc;
using ReservaHotel.Services;
using ReservaHotel.Models;

namespace ReservaHotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        private readonly DbpediaService _dbpediaService;
        private readonly ILogger<HotelsController> _logger;

        public HotelsController(DbpediaService dbpediaService, ILogger<HotelsController> logger)
        {
            _dbpediaService = dbpediaService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetHotels(CancellationToken ct)
        {
            try
            {
                var hotels = await _dbpediaService.GetHotelsAsync(limit: 150, ct: ct);
                return Ok(hotels);
            }
            catch (TaskCanceledException ex)
            {
                _logger.LogWarning(ex, "Timeout consultando DBpedia.");
                return StatusCode(504, "DBpedia demorou para responder (timeout).");
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Erro HTTP ao consultar DBpedia.");
                return StatusCode(502, "Falha ao consultar serviço externo (DBpedia).");
            }
        }

        // POST /api/hotels/search
        [HttpPost("search")]
        public async Task<IActionResult> SearchHotelsByName(
            [FromBody] HotelSearchRequest req,
            CancellationToken ct)
        {
            if (string.IsNullOrWhiteSpace(req?.Name))
                return BadRequest("Informe o campo 'name' no corpo da requisição.");

            var limit = (req.Limit is > 0 and <= 1000) ? req.Limit.Value : 200;

            try
            {
                var hotels = await _dbpediaService.SearchHotelsByNameAsync(req.Name!, limit, ct);
                return Ok(hotels);
            }
            catch (TaskCanceledException ex)
            {
                _logger.LogWarning(ex, "Timeout consultando DBpedia (search).");
                return StatusCode(504, "DBpedia demorou para responder (timeout).");
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Erro HTTP ao consultar DBpedia (search).");
                return StatusCode(502, "Falha ao consultar serviço externo (DBpedia).");
            }
        }
    }
}
