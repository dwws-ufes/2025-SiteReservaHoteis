using ReservaHotel.DTOs;

namespace ReservaHotel.Services
{
    public interface IFoodService
    {
        Task<IEnumerable<FoodDTO>> Get(int? id, string? name, string? tag);
        Task Create(FoodCreateDTO foodCreateDto);
        Task Update(FoodDTO foodDto);
        Task Delete(int id);
    }
}
