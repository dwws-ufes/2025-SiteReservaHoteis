namespace ReservaHotel.Config
{
    public class ConfigurationService
    {
        public string JwtKey { get; set; } = default!;
        public string Issuer { get; set; } = default!;
        public string Audience { get; set; } = default!;
    }
}
