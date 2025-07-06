using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReservaHotel.Migrations
{
    /// <inheritdoc />
    public partial class addUserTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "FirstName", "IsAdmin", "LastName", "Password" },
                values: new object[] { new Guid("31aa1652-db12-41a6-9109-23c04d8eb1b2"), "cliff@mail.com", "Cliff", false, "Stanford", "AQAAAAIAAYagAAAAEIIRpFTL+PuPKFKyfyfZ8ZRVZNWzXFZ8hJQkmtFvfy14h3TRSvx37W3oTJU57wY4iA==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("31aa1652-db12-41a6-9109-23c04d8eb1b2"));
        }
    }
}
