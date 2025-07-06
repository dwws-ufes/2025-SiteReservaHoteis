using ReservaHotel.Entities;

namespace ReservaHotel.DTOs
{
    public class ServiceDTO
    {
        public int Id { get; set; }
        public float Price { get; set; }
        public DateTime DeliveryTime { get; set; }

        public UserDTO User { get; set; }
        public Guid UserId { get; set; }

        public ICollection<ServiceItemDTO> ServiceItems { get; set; } = [];

        public static ServiceDTO GetDto(Service service) =>
            new()
            {
                Id = service.Id,
                Price = service.Price,
                DeliveryTime = service.DeliveryTime,
                User = UserDTO.GetDto(service.User),
                UserId = service.UserId,
                ServiceItems = service.ServiceItems.Select(x => ServiceItemDTO.GetDto(x)).ToList()
            };
    }
    public class ServiceCreateDTO
    {
        public float Price { get; set; }
        public DateTime DeliveryTime { get; set; }
        public Guid UserId { get; set; }

        public ICollection<ServiceItemCreateDTO> ServiceItems { get; set; } = [];
    }
}
