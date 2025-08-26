using ReservaHotel.LinkedData;

namespace ReservaHotel.LinkedData
{
    public class BookingLikeAdapter : IBookingLike
    {
        public int Id { get; init; }
        public DateTime CheckIn { get; init; }
        public DateTime CheckOut { get; init; }
        public float Price { get; init; }
        public int RoomQtd { get; init; }
        public int AdultsNumber { get; init; }
        public int ChildNumber { get; init; }
        public int RoomId { get; init; }
        public Guid UserId { get; init; }

        public static BookingLikeAdapter FromDto(object dto)
        {
            // usa reflexão leve para não acoplar ao seu tipo exato de DTO
            T Get<T>(string name)
            {
                var val = dto.GetType().GetProperty(name)!.GetValue(dto);
                return (T)Convert.ChangeType(val!, typeof(T));
            }

            return new BookingLikeAdapter
            {
                Id            = Get<int>(nameof(Id)),
                CheckIn       = Get<DateTime>(nameof(CheckIn)),
                CheckOut      = Get<DateTime>(nameof(CheckOut)),
                Price         = Get<float>(nameof(Price)),
                RoomQtd       = Get<int>(nameof(RoomQtd)),
                AdultsNumber  = Get<int>(nameof(AdultsNumber)),
                ChildNumber   = Get<int>(nameof(ChildNumber)),
                RoomId        = Get<int>(nameof(RoomId)),
                UserId        = Get<Guid>(nameof(UserId)),
            };
        }
    }
}
