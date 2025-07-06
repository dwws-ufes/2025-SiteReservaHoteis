using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservaHotel.DTOs;
using ReservaHotel.Services.Interfaces;

namespace ReservaHotel.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class FoodController : Controller
    {
        private readonly IFoodService foodService;

        public FoodController(IFoodService foodService)
        {
            this.foodService = foodService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int? id, string? name, string? tag)
        {
            var food = await foodService.Get(id, name, tag);
            return Ok(food);
        }

        [HttpPost]
        public async Task<IActionResult> Post(FoodCreateDTO foodDto)
        {
            await foodService.Create(foodDto);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(FoodDTO foodDto)
        {
            await foodService.Update(foodDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await foodService.Delete(id);
            return Ok();
        }
    }
}
