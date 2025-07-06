using ReservaHotel.Entities;

namespace ReservaHotel.DTOs
{
    public class BookingCreateDTO
    {
        public float Price { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public int RoomQtd { get; set; }

        public int AdultsNumber { get; set; }
        public int ChildNumber { get; set; }

        public Guid UserId { get; set; }

        public int RoomId { get; set; }

        public Booking GetEntity() =>
            new()
            {
                Price = Price,
                CheckIn = CheckIn,
                CheckOut = CheckOut,
                RoomQtd = RoomQtd,
                AdultsNumber = AdultsNumber,
                ChildNumber = ChildNumber,
                UserId = UserId,
                RoomId = RoomId
            };
    }
}
