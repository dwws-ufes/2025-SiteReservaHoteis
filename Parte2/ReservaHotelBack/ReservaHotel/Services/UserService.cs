using ReservaHotel.DTOs;
using ReservaHotel.Entities;
using ReservaHotel.Repository.Interfaces;
using ReservaHotel.Services.Interfaces;
using ReservaHotel.Utils;

namespace ReservaHotel.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenService _jwtTokenService;

        public UserService(IUserRepository userRepository, IJwtTokenService jwtTokenService)
        {
            _userRepository = userRepository;
            _jwtTokenService = jwtTokenService;
        }

        public async Task Create(UserCreateDTO userDto)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                Password = HashPassword.Hash(userDto.Password),
            };

            await _userRepository.Create(user);
        }

        public async Task Delete(Guid id)
        {
            await _userRepository.Delete(id);
        }

        public async Task<IEnumerable<UserDTO>> Get(Guid? id = null, string? email = null)
        {
            var users = await _userRepository.Get(id, email);
            return users.Select(x => new UserDTO
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Email = x.Email,
                IsAdmin = x.IsAdmin
            });
        }

        public async Task<(UserDTO, string)> Login(string email, string password)
        {
            var user = (await _userRepository.Get(email: email)).FirstOrDefault();
            if (user == null)
                throw new Exception("user not found");

            var passwordIsCorrect = HashPassword.Verify(password, user.Password);
            if (!passwordIsCorrect)
                throw new UnauthorizedAccessException("password incorrect");

            var token = _jwtTokenService.Generate(email);
            var userDto = new UserDTO { Email = user.Email, FirstName = user.FirstName, LastName = user.LastName, Id = user.Id, IsAdmin = user.IsAdmin };
            return (userDto, token);
        }
    }
}
