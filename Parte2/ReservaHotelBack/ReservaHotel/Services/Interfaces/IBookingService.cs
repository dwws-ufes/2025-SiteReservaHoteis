using ReservaHotel.DTOs;

namespace ReservaHotel.Services.Interfaces
{
    public interface IBookingService
    {
        Task<IEnumerable<BookingDTO>> Get();
        Task Create(BookingCreateDTO booking);
        Task Update(BookingDTO booking);
        Task Delete(int id);
    }
}
