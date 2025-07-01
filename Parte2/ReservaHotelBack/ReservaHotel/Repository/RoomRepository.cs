using Microsoft.EntityFrameworkCore;
using ReservaHotel.Entities;
using ReservaHotel.Infra.Core;

namespace ReservaHotel.Repository
{
    public class RoomRepository : IRoomRepository
    {
        private readonly AppDbContext _context;
        public RoomRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<Room> Create(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
            return room;
        }

        public async Task<IEnumerable<Room>> Get()
        {
            return await _context.Rooms.ToListAsync();
        }

        public async Task<Room> Edit(Room room)
        {
            var oldRoom = await _context.Rooms.AsQueryable().FirstOrDefaultAsync(x => x.Id == room.Id);
            if (oldRoom == null)
                throw new Exception("Room not found");

            oldRoom.Name = room.Name;
            oldRoom.Description = room.Description;
            oldRoom.Price = room.Price;
            oldRoom.ImageUrl = room.ImageUrl;

            await _context.SaveChangesAsync();
            return oldRoom;
        }

        public async Task Delete(Guid id)
        {
            var room = await _context.Rooms.AsQueryable().FirstOrDefaultAsync(x => x.Id == id);
            if (room == null)
                throw new Exception("Room not found");

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return;
        }
    }
}
