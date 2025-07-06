using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservaHotel.DTOs;
using ReservaHotel.Services.Interfaces;
using System.Security.Claims;

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
        [Authorize]
        public async Task<IActionResult> Get(Guid? id = null)
        {
            return Ok(await _userService.Get(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserCreateDTO userDTO)
        {
            await _userService.Create(userDTO);
            return Ok();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _userService.Delete(id);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginInfo info)
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

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetUserProfile()
        {
            var email = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            if (email == null)
                throw new Exception("Claim 'sub' not found");

            return Ok((await _userService.Get(email: email)).First());
        }
    }
}
