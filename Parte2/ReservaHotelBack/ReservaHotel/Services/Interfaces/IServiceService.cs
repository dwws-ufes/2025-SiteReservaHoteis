using ReservaHotel.DTOs;
using ReservaHotel.Entities;

namespace ReservaHotel.Services.Interfaces
{
    public interface IServiceService
    {
        Task Create(ServiceCreateDTO serviceDto);
        Task Delete(int id);
        Task<IEnumerable<ServiceDTO>> Get(Guid userId);
    }
}
