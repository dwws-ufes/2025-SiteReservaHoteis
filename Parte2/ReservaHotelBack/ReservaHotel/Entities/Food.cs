namespace ReservaHotel.Entities
{
    public class Food
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string[] Tags { get; set; }
        public string ImageUrl { get; set; }
        public string[] Origins { get; set; }
        public string CookTime { get; set; }
    }
}
