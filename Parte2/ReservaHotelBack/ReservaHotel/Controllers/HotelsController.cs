using Microsoft.AspNetCore.Mvc;
using ReservaHotel.Services;

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
    public async Task<IActionResult> GetHotels(CancellationToken ct) // <- pega o token da request
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
}


}