using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservaHotel.DTOs;
using ReservaHotel.Services.Interfaces;

namespace ReservaHotel.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ServiceController : Controller
    {
        private readonly IServiceService service;

        public ServiceController(IServiceService service)
        {
            this.service = service;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(Guid userId)
        {
            return Ok(await service.Get(userId));
        }

        [HttpPost]
        public async Task<IActionResult> Post(ServiceCreateDTO serviceCreateDto)
        {
            await service.Create(serviceCreateDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await service.Delete(id);
            return Ok();
        }
    }
}
