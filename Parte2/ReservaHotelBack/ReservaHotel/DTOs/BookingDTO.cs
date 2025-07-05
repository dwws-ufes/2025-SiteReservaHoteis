using ReservaHotel.Entities;

namespace ReservaHotel.DTOs
{
    public class BookingDTO
    {
        public int Id { get; set; }

        public float Price { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public int RoomQtd { get; set; }

        public int AdultsNumber { get; set; }
        public int ChildNumber { get; set; }

        public UserDTO User { get; set; }
        public Guid UserId { get; set; }

        public RoomDTO Room { get; set; }
        public int RoomId { get; set; }

        public Booking GetEntity() =>
            new()
            {
                Id = Id,
                Price = Price,
                CheckIn = CheckIn,
                CheckOut = CheckOut,
                RoomQtd = RoomQtd,
                AdultsNumber = AdultsNumber,
                ChildNumber = ChildNumber,
                UserId = UserId,
                RoomId = RoomId
            };

        public static BookingDTO GetDto(Booking booking) =>
            new()
            {
                Id = booking.Id,
                Price = booking.Price,
                CheckIn = booking.CheckIn,
                CheckOut = booking.CheckOut,
                RoomQtd = booking.RoomQtd,
                AdultsNumber = booking.AdultsNumber,
                ChildNumber = booking.ChildNumber,
                UserId = booking.UserId,
                RoomId = booking.RoomId
            };
    }
}
