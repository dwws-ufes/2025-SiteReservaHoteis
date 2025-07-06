using ReservaHotel.DTOs;
using ReservaHotel.Repository.Interfaces;
using ReservaHotel.Services.Interfaces;
using System.Xml.Linq;

namespace ReservaHotel.Services
{
    public class FoodService : IFoodService
    {
        private readonly IFoodRepository foodRepository;
        
        public FoodService(IFoodRepository foodRepository)
        {
            this.foodRepository = foodRepository;
        }

        public async Task Create(FoodCreateDTO foodCreateDto)
        {
            var food = foodCreateDto.GetEntity();
            await foodRepository.Create(food);
        }

        public async Task Delete(int id)
        {
            await foodRepository.Delete(id);
        }

        public async Task<IEnumerable<FoodDTO>> Get(int? id, string? name, string? tag)
        {
            return (await foodRepository.Get(name, tag, id != null ? [(int)id] : null)).Select(x => FoodDTO.GetDto(x));
        }

        public async Task Update(FoodDTO food)
        {
            await foodRepository.Update(food.GetEntity());
        }
    }
}
