using ReservaHotel.Entities;

namespace ReservaHotel.DTOs
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }

        public static UserDTO GetDto(User user) =>
            new()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                IsAdmin = user.IsAdmin
            };
    }
}
