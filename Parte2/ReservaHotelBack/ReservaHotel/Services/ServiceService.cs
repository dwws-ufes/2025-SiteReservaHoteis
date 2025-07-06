using ReservaHotel.DTOs;
using ReservaHotel.Entities;
using ReservaHotel.Repository.Interfaces;
using ReservaHotel.Services.Interfaces;

namespace ReservaHotel.Services
{
    public class ServiceService : IServiceService
    {
        private readonly IServiceRepository serviceRepository;

        public ServiceService(IServiceRepository serviceRepository)
        {
            this.serviceRepository = serviceRepository;
        }

        public async Task Create(ServiceCreateDTO serviceDto)
        {
            var service = new Service
            {
                Price = serviceDto.Price,
                DeliveryTime = serviceDto.DeliveryTime,
                UserId = serviceDto.UserId,
                ServiceItems = serviceDto.ServiceItems
                    .Select(x => new ServiceItem
                    {
                        FoodId = x.FoodId,
                        Qtd = x.Qtd,
                    })
                    .ToList()
            };

            await serviceRepository.Create(service);
        }

        public async Task Delete(int id)
        {
            await serviceRepository.Delete(id);
        }

        public async Task<IEnumerable<ServiceDTO>> Get(Guid userId)
        {
            return (await serviceRepository.Get(userId)).Select(x => ServiceDTO.GetDto(x));
        }
    }
}
