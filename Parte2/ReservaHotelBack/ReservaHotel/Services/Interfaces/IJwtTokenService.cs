namespace ReservaHotel.Services.Interfaces
{
    public interface IJwtTokenService
    {
        public string Generate(string email);
        Task<bool> Validate(string token);
    }
}
