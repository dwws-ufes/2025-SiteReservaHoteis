using Microsoft.AspNetCore.Mvc;
using ReservaHotel.Services;

namespace ReservaHotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private readonly DbpediaService _dbpedia;

        public RestaurantsController(DbpediaService dbpedia)
        {
            _dbpedia = dbpedia;
        }

        [HttpGet]
        public async Task<IActionResult> GetRestaurants()
        {
            var restaurants = await _dbpedia.GetRestaurantsAsync();
            return Ok(restaurants); 
        }
    }
}
