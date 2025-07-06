using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ReservaHotel.Config;
using ReservaHotel.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

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
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configurationService.JwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: configurationService.Issuer,
                audience: configurationService.Audience,
                claims: claims,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<bool> Validate(string token)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configurationService.JwtKey));
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParam = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = configurationService.Issuer,

                ValidateAudience = true,
                ValidAudience = configurationService.Audience,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,

                ValidateLifetime = false
            };

            var result = await tokenHandler.ValidateTokenAsync(token, validationParam);
            return result.IsValid;
        }
    }
}
