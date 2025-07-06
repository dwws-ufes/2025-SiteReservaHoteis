using ReservaHotel.Entities;

namespace ReservaHotel.DTOs
{
    public class ServiceItemDTO
    {
        public int Id { get; set; }
        public int Qtd { get; set; }

        public FoodDTO Food { get; set; }
        public int FoodId { get; set; }

        public static ServiceItemDTO GetDto(ServiceItem serviceItem) =>
            new()
            {
                Id = serviceItem.Id,
                Qtd = serviceItem.Qtd,
                Food = FoodDTO.GetDto(serviceItem.Food),
                FoodId = serviceItem.FoodId,
            };
    }
    public class ServiceItemCreateDTO
    {
        public int Qtd { get; set; }
        public int FoodId { get; set; }
    }
}
