using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservaHotel.DTOs;
using ReservaHotel.Services.Interfaces;

namespace ReservaHotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : Controller
    {
        public readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        public async Task<IEnumerable<RoomDTO>> Get()
        {
            return await _roomService.Get();
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] RoomCreateDTO roomDto)
        {
            var room = await _roomService.Create(roomDto);
            return Ok(room);
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult> Put([FromBody] RoomDTO roomDto)
        {
            try
            {
                return Ok(await _roomService.Edit(roomDto));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            try
            {
                await _roomService.Delete(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
