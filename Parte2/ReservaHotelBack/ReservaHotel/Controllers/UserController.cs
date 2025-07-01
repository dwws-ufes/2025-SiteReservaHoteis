using Microsoft.AspNetCore.Mvc;
using ReservaHotel.DTOs;
using ReservaHotel.Services;

namespace ReservaHotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IEnumerable<UserDTO>> Get(Guid? id = null)
        {
            return await _userService.Get(id);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserCreateDTO userDTO)
        {
            await _userService.Create(userDTO);
            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(Guid id)
        {
            await _userService.Delete(id);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginInfo info)
        {
            try
            {
                var (user, token) = await _userService.Login(info.Email, info.Password);
                return Ok(new { user, token });
            } catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
