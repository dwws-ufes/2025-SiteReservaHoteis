using ReservaHotel.Entities;

namespace ReservaHotel.DTOs
{
    public class RoomDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public float Price { get; set; }

        public static RoomDTO GetDto(Room room) =>
            new()
            {
                Id = room.Id,
                Name = room.Name,
                Description = room.Description,
                ImageUrl = room.ImageUrl,
                Price = room.Price
            };
    }
}
