using Microsoft.EntityFrameworkCore.Migrations;

namespace DadsDayApp.Migrations
{
    public partial class AddLatitudeAndLongitudeToDayOut : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "DaysOut",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "DaysOut",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "DaysOut");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "DaysOut");
        }
    }
}
