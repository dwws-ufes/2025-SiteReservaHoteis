using Microsoft.EntityFrameworkCore;
using ReservaHotel.Entities;
using ReservaHotel.Infra.Core;
using ReservaHotel.Repository.Interfaces;

namespace ReservaHotel.Repository
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly AppDbContext _context;
        public ServiceRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task Create(Service service)
        {
            _context.Services.Add(service);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var service = _context.Services.FirstOrDefaultAsync(x => x.Id == id);
            if (service == null)
            {
                throw new Exception("Service not found");
            }

            _context.Remove(service);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Service>> Get(Guid userId)
        {
            var services = _context.Services
                .Include(x => x.User)
                .Include(x => x.ServiceItems)
                .ThenInclude(x => x.Food)
                .Where(x => x.UserId == userId);

            return await services.ToListAsync();
        }
    }
}
