using System.ComponentModel.DataAnnotations.Schema;

namespace ReservaHotel.Entities
{
    public class User
    {
        [ForeignKey("Id")]
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; } = false;

        public ICollection<Booking> Bookings { get; }
        public ICollection<Service> Services { get; }
    }
}
