using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReservaHotel.Migrations
{
    /// <inheritdoc />
    public partial class seedAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "imageUrl",
                table: "Rooms",
                newName: "ImageUrl");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "Password" },
                values: new object[] { new Guid("8df75a4a-783d-4f4d-8e8e-cb3d3e32ba29"), "admin@mail.com", "Admin", "Admin", "AQAAAAIAAYagAAAAEGz/fpd61Ohoc6bWFk7V6IDD9IsMBIrxAflFIc5mJFqki6ZS6hAg2/IIx4fEEF9ODw==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("8df75a4a-783d-4f4d-8e8e-cb3d3e32ba29"));

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Rooms",
                newName: "imageUrl");
        }
    }
}
