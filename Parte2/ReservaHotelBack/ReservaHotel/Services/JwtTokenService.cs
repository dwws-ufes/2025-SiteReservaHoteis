using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ReservaHotel.Config;
using ReservaHotel.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ReservaHotel.Services
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly ConfigurationService configurationService;

        public JwtTokenService(IOptions<ConfigurationService> configurationService)
        {
            this.configurationService = configurationService.Value;
        }

        public string Generate(string email)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configurationService.JwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: "reservaHotel",
                audience: "reservaHotel",
                claims: claims,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
