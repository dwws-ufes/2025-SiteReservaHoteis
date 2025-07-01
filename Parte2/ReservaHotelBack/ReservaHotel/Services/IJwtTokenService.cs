namespace ReservaHotel.Services
{
    public interface IJwtTokenService
    {
        public string Generate(string email);
    }
}
