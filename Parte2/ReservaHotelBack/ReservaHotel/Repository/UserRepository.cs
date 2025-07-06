using Microsoft.EntityFrameworkCore;
using ReservaHotel.Entities;
using ReservaHotel.Infra.Core;
using ReservaHotel.Repository.Interfaces;

namespace ReservaHotel.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task Create(User user)
        {
            if (await _context.Users.AnyAsync(x => x.Email == user.Email))
                return;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task Delete(Guid id)
        {
            var user = (await Get(id)).FirstOrDefault();
            if (user == null)
                throw new Exception("User not found");

            if (user.IsAdmin)
                throw new Exception("Cannot delete admin");

            _context.Remove(id);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task<IEnumerable<User>> Get(Guid? id = null, string? email = null)
        {
            var users = await _context.Users
                .Where(x =>
                    (id == null || id == x.Id)
                    && (email == null || email.Equals(x.Email))
                )
                .ToListAsync();
            return users;
        }
    }
}
