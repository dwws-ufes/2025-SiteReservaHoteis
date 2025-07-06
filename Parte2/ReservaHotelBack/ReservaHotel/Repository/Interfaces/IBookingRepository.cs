using ReservaHotel.Entities;

namespace ReservaHotel.Repository.Interfaces
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> Get(Guid userId);
        Task Create(Booking booking);
        Task Update(Booking booking);
        Task Delete(int id);
    }
}
