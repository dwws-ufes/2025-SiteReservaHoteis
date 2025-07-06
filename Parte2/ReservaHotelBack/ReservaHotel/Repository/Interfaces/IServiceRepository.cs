using ReservaHotel.Entities;

namespace ReservaHotel.Repository.Interfaces
{
    public interface IServiceRepository
    {
        Task Create(Service service);
        Task Delete(int id);
        Task<IEnumerable<Service>> Get(Guid userId);
    }
}
