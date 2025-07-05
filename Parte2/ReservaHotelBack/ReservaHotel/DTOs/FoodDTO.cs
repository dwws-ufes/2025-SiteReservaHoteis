using ReservaHotel.Entities;

namespace ReservaHotel.DTOs
{
    public class FoodDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string[] Tags { get; set; }
        public string ImageUrl { get; set; }
        public string[] Origins { get; set; }
        public string CookTime { get; set; }

        public Food GetEntity() =>
            new()
            {
                Id = Id,
                Name = Name,
                Price = Price,
                Tags = Tags,
                ImageUrl = ImageUrl,
                Origins = Origins,
                CookTime = CookTime
            };

        public static FoodDTO GetDto(Food food) =>
            new()
            {
                Id = food.Id,
                Name = food.Name,
                Price = food.Price,
                Tags = food.Tags,
                ImageUrl = food.ImageUrl,
                Origins = food.Origins,
                CookTime = food.CookTime
            };
    }
}
