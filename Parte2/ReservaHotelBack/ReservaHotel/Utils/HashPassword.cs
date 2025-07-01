using Microsoft.AspNetCore.Identity;

namespace ReservaHotel.Utils
{
    public static class HashPassword
    {
        public static string Hash(string password)
        {
            var hasher = new PasswordHasher<object>();
            return hasher.HashPassword(null, password);
        }

        public static bool Verify(string inputPassword, string hash)
        {
            var hasher = new PasswordHasher<object>();
            var result = hasher.VerifyHashedPassword(null, hash, inputPassword);
            return result == PasswordVerificationResult.Success;
        }
    }
}
