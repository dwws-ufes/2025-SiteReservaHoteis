using ReservaHotel.Entities;

namespace ReservaHotel.Repository.Interfaces
{
    public interface IFoodRepository
    {
        Task<IEnumerable<Food>> Get(string? name, string? tag, params int[]? id);
        Task Create(Food food);
        Task Update(Food food);
        Task Delete(int id);
    }
}
