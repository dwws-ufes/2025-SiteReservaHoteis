using System.ComponentModel.DataAnnotations.Schema;

namespace ReservaHotel.Entities
{
    public class Room
    {
        [ForeignKey("Id")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public float Price { get; set; }

        public ICollection<Booking> Bookings { get; set; }
    }
}
