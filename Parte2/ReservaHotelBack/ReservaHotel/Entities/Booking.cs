namespace ReservaHotel.Entities
{
    public class Booking
    {
        public int Id { get; set; }

        public float Price { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public int RoomQtd { get; set; }

        public int AdultsNumber { get; set; }
        public int ChildNumber { get; set; }

        public User User { get; set; }
        public Guid UserId { get; set; }

        public Room Room { get; set; }
        public int RoomId { get; set; }
    }
}
