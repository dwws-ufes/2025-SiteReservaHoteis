using Microsoft.EntityFrameworkCore;
using ReservaHotel.Entities;
using ReservaHotel.Infra.Core;
using System.Linq.Expressions;

namespace ReservaHotel.Repository
{
    public class FoodRepository : IFoodRepository
    {
        private readonly AppDbContext _context;
        public FoodRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task Create(Food food)
        {
            _context.Foods.Add(food);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task Delete(int id)
        {
            var food = await _context.Foods.AsQueryable().FirstOrDefaultAsync(x => x.Id == id);
            if (food == null)
                throw new Exception("Food not found");

            _context.Foods.Remove(food);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task<IEnumerable<Food>> Get(int? id, string? name, string? tag)
        {
            var filters = new List<Expression<Func<Food, bool>>>();
            if (id != null)
                filters.Add(x => x.Id == id);
            if (name != null)
                filters.Add(x => x.Name.ToLower().Contains(name.ToLower()));
            if (tag != null)
                filters.Add(x => x.Tags.Contains(tag));

            var query = _context.Foods.AsQueryable();
            foreach (var filter in filters)
                query = query.Where(filter);

            return await query.ToListAsync();
        }

        public async Task Update(Food food)
        {
            var oldFood = await _context.Foods.AsQueryable().FirstOrDefaultAsync(x => x.Id == food.Id);
            if (oldFood == null)
                throw new Exception("Food not found");

            oldFood.Name = food.Name;
            oldFood.Price = food.Price;
            oldFood.Tags = food.Tags;
            oldFood.ImageUrl = food.ImageUrl;
            oldFood.Origins = food.Origins;
            oldFood.CookTime = food.CookTime;

            await _context.SaveChangesAsync();
            return;
        }
    }
}
