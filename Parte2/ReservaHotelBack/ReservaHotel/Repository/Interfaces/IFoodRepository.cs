using ReservaHotel.Entities;

namespace ReservaHotel.Repository.Interfaces
{
    public interface IFoodRepository
    {
        Task<IEnumerable<Food>> Get(int? id, string? name, string? tag);
        Task Create(Food food);
        Task Update(Food food);
        Task Delete(int id);
    }
}
