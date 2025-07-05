using ReservaHotel.DTOs;

namespace ReservaHotel.Services
{
    public interface IRoomService
    {
        Task<IEnumerable<RoomDTO>> Get();
        Task<RoomDTO> Create(RoomCreateDTO roomDto);
        Task<RoomDTO> Edit(RoomDTO roomDto);
        Task Delete(int id);
    }
}
