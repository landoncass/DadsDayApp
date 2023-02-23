using Microsoft.EntityFrameworkCore.Migrations;

namespace DadsDayApp.Migrations
{
    public partial class AddPhotoURLToDayOut : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoURL",
                table: "DaysOut",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoURL",
                table: "DaysOut");
        }
    }
}
