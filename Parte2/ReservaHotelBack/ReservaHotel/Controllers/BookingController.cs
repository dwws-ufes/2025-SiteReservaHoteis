using Microsoft.AspNetCore.Mvc;
using ReservaHotel.DTOs;
using ReservaHotel.Services.Interfaces;

namespace ReservaHotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : Controller
    {
        private readonly IBookingService bookingService;

        public BookingController(IBookingService bookingService)
        {
            this.bookingService = bookingService;
        }

        [HttpPost]
        public async Task<IActionResult> Post(BookingCreateDTO bookingDto)
        {
            await bookingService.Create(bookingDto);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await bookingService.Delete(id);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(BookingDTO bookingDto)
        {
            await bookingService.Update(bookingDto);
            return Ok();
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(Guid userId)
        {
            var bookings = await bookingService.Get(userId);
            return Ok(bookings);
        }
    }
}
