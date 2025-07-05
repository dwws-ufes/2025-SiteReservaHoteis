using ReservaHotel.DTOs;

namespace ReservaHotel.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDTO>> Get(Guid? id = null);
        Task Create(UserCreateDTO pessoaDTO);
        Task Delete(Guid id);
        Task<(UserDTO, string)> Login(string email, string password);
    }
}
