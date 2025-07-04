using Microsoft.EntityFrameworkCore;
using ReservaHotel.Entities;
using ReservaHotel.Utils;

namespace ReservaHotel.Infra.Core
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasIndex(x => x.Email).IsUnique();

            modelBuilder.Entity<User>()
                .HasData(
                    new User
                    {
                        Id = Guid.Parse("8df75a4a-783d-4f4d-8e8e-cb3d3e32ba29"),
                        Email = "admin@mail.com",
                        FirstName = "Admin",
                        LastName = "Admin",
                        Password = "AQAAAAIAAYagAAAAEGz/fpd61Ohoc6bWFk7V6IDD9IsMBIrxAflFIc5mJFqki6ZS6hAg2/IIx4fEEF9ODw=="
                    }
                );
        }
    }
}
