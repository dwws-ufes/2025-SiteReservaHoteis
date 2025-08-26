using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservaHotel.DTOs;
using ReservaHotel.Services.Interfaces;
using ReservaHotel.LinkedData;

namespace ReservaHotel.Controllers
{
    [ApiController]
    [Authorize]
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
            try
            {
                await bookingService.Create(bookingDto);
                return Ok();
            }
            catch
            {
                return BadRequest("It was not possible to create the reservation");
            }
        }

        [HttpDelete("{id}")]
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

        [HttpGet("{userId}/rdf")]
        public async Task<IActionResult> GetUserBookingsAsRdf(Guid userId, [FromQuery] string? format = "jsonld")
        {
            // 1) usa o seu serviço atual para listar reservas do usuário
            var dtos = await bookingService.Get(userId); // lista de BookingDTOs
            //                └── já existe no seu serviço. :contentReference[oaicite:4]{index=4}

            var items = dtos.Select(BookingLikeAdapter.FromDto).ToList();

            // 2) serializa em JSON-LD ou Turtle
            if (string.Equals(format, "turtle", StringComparison.OrdinalIgnoreCase)
            || string.Equals(format, "ttl", StringComparison.OrdinalIgnoreCase))
            {
                var ttl = BookingLinkedDataBuilder.ToTurtle(items);
                return Content(ttl, "text/turtle; charset=utf-8");
            }

            var jsonld = BookingLinkedDataBuilder.ToJsonLd(items);
            return Content(jsonld, "application/ld+json; charset=utf-8");
        }
    }
}
