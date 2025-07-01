using ReservaHotel.DTOs;
using ReservaHotel.Entities;

namespace ReservaHotel.Repository
{
    public interface IRoomRepository
    {
        Task<IEnumerable<Room>> Get();
        Task<Room> Create(Room room);
        Task<Room> Edit(Room room);
        Task Delete(Guid id);
    }
}
