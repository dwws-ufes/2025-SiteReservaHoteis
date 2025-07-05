using ReservaHotel.DTOs;

namespace ReservaHotel.Services.Interfaces
{
    public interface IRoomService
    {
        Task<IEnumerable<RoomDTO>> Get();
        Task<RoomDTO> Create(RoomCreateDTO roomDto);
        Task<RoomDTO> Edit(RoomDTO roomDto);
        Task Delete(int id);
    }
}
