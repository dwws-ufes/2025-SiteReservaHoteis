using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReservaHotel.Migrations
{
    /// <inheritdoc />
    public partial class addFlagAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("8df75a4a-783d-4f4d-8e8e-cb3d3e32ba29"),
                column: "IsAdmin",
                value: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "Users");
        }
    }
}
