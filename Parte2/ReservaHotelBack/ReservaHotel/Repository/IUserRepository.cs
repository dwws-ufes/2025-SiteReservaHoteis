using ReservaHotel.Entities;

namespace ReservaHotel.Repository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> Get(Guid? id = null, string? email = null);
        Task Create(User user);
        Task Delete(Guid id);
    }
}
