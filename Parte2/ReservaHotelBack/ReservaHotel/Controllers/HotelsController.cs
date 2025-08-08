using Microsoft.AspNetCore.Mvc;
using ReservaHotel.Services;

namespace ReservaHotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        private readonly DbpediaService _dbpediaService;

        public HotelsController(DbpediaService dbpediaService)
        {
            _dbpediaService = dbpediaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetHotels()
        {
            var hotels = await _dbpediaService.GetHotelsAsync();
            return Ok(hotels);
        }
    }

}