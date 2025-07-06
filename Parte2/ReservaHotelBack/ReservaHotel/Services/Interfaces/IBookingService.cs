using ReservaHotel.DTOs;

namespace ReservaHotel.Services.Interfaces
{
    public interface IBookingService
    {
        Task<IEnumerable<BookingDTO>> Get(Guid userId);
        Task Create(BookingCreateDTO booking);
        Task Update(BookingDTO booking);
        Task Delete(int id);
    }
}
