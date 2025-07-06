using Microsoft.EntityFrameworkCore;
using ReservaHotel.Entities;
using ReservaHotel.Infra.Core;
using ReservaHotel.Repository.Interfaces;

namespace ReservaHotel.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AppDbContext _context;
        public BookingRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task Create(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var booking = await _context.Bookings.AsQueryable().FirstOrDefaultAsync(x => x.Id == id);
            if (booking == null)
                throw new Exception("Booking not found");

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Booking>> Get(Guid userId)
        {
            return await _context.Bookings
                .Where(x => x.UserId == userId)
                .Include(x => x.User)
                .Include(x => x.Room)
                .ToListAsync();
        }

        public async Task Update(Booking booking)
        {
            var oldBooking = await _context.Bookings.AsQueryable().FirstOrDefaultAsync(x => x.Id == booking.Id);
            if (oldBooking == null)
                throw new Exception("Room not found");

            oldBooking.Price = booking.Price;
            oldBooking.CheckIn = booking.CheckIn;
            oldBooking.CheckOut = booking.CheckOut;
            oldBooking.RoomQtd = booking.RoomQtd;
            oldBooking.AdultsNumber = booking.AdultsNumber;
            oldBooking.ChildNumber = booking.ChildNumber;
            oldBooking.UserId = booking.UserId;
            oldBooking.RoomId = booking.RoomId;

            await _context.SaveChangesAsync();
        }
    }
}
