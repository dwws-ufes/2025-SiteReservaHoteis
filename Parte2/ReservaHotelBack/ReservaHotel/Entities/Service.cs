namespace ReservaHotel.Entities
{
    public class Service
    {
        public int Id { get; set; }
        public float Price { get; set; }
        public DateTime DeliveryTime { get; set; }

        public User User { get; }
        public Guid UserId { get; set; }

        public ICollection<ServiceItem> ServiceItems { get; set; } = [];
    }
}
