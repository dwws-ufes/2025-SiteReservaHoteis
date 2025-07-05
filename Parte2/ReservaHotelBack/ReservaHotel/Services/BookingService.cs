using ReservaHotel.DTOs;
using ReservaHotel.Repository.Interfaces;
using ReservaHotel.Services.Interfaces;

namespace ReservaHotel.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository bookingRepository;

        public BookingService(IBookingRepository bookingRepository)
        {
            this.bookingRepository = bookingRepository;
        }

        public async Task Create(BookingCreateDTO booking)
        {
            await bookingRepository.Create(booking.GetEntity());
        }

        public async Task Delete(int id)
        {
            await bookingRepository.Delete(id);
        }

        public async Task<IEnumerable<BookingDTO>> Get()
        {
            return (await bookingRepository.Get()).Select(booking => BookingDTO.GetDto(booking));
        }

        public async Task Update(BookingDTO booking)
        {
            await bookingRepository.Update(booking.GetEntity());
        }
    }
}
