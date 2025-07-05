using ReservaHotel.DTOs;
using ReservaHotel.Entities;
using ReservaHotel.Repository;

namespace ReservaHotel.Services
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository roomRepository;

        public RoomService(IRoomRepository roomRepository)
        {
            this.roomRepository = roomRepository;
        }

        public async Task<RoomDTO> Create(RoomCreateDTO roomDto)
        {
            var roomCreate = new Room
            {
                Name = roomDto.Name,
                Description = roomDto.Description,
                Price = roomDto.Price,
                ImageUrl = roomDto.ImageUrl
            };
            var room = await roomRepository.Create(roomCreate);
            return new RoomDTO { Id = room.Id, Name = room.Name, Price = room.Price, ImageUrl = room.ImageUrl, Description = room.Description };
        }

        public async Task<IEnumerable<RoomDTO>> Get()
        {
            return (await roomRepository.Get())
                .Select(room => new RoomDTO { Id = room.Id, Name = room.Name, Price = room.Price, ImageUrl = room.ImageUrl, Description = room.Description });
        }

        public async Task<RoomDTO> Edit(RoomDTO roomDto)
        {
            var room = new Room
            {
                Id = roomDto.Id,
                Name = roomDto.Name,
                Description = roomDto.Description,
                Price = roomDto.Price,
                ImageUrl = roomDto.ImageUrl
            };

            var newRoom = await roomRepository.Edit(room);
            return new RoomDTO { Id = newRoom.Id, Name = newRoom.Name, Price = newRoom.Price, ImageUrl = newRoom.ImageUrl, Description = newRoom.Description };
        }

        public async Task Delete(int id)
        {
            await roomRepository.Delete(id);
        }
    }
}
