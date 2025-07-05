using ReservaHotel.Entities;

namespace ReservaHotel.DTOs
{
    public class FoodCreateDTO
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public string[] Tags { get; set; }
        public string ImageUrl { get; set; }
        public string[] Origins { get; set; }
        public string CookTime { get; set; }

        public Food GetEntity() =>
            new()
            {
                Name = Name,
                Price = Price,
                Tags = Tags,
                ImageUrl = ImageUrl,
                Origins = Origins,
                CookTime = CookTime
            };
    }
}
