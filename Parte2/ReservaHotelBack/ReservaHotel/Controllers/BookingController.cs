﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservaHotel.DTOs;
using ReservaHotel.Services.Interfaces;

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
    }
}
