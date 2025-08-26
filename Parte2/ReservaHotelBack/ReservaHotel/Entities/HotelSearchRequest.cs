namespace ReservaHotel.Models
{
    public class HotelSearchRequest
    {
        public string? Name { get; set; }
        public int? Limit { get; set; } // opcional (default no controller)
    }
}
