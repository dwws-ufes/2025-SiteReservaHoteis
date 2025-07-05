using ReservaHotel.DTOs;
using ReservaHotel.Entities;

namespace ReservaHotel.Repository.Interfaces
{
    public interface IRoomRepository
    {
        Task<IEnumerable<Room>> Get();
        Task<Room> Create(Room room);
        Task<Room> Edit(Room room);
        Task Delete(int id);
    }
}
