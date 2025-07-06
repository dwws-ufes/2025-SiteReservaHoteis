namespace ReservaHotel.Entities
{
    public class ServiceItem
    {
        public int Id { get; set; }
        public int Qtd { get; set; }

        public Food Food { get; set; }
        public int FoodId { get; set; }

        public int ServiceId { get; set; }
        public Service Service { get; set; }
    }
}
