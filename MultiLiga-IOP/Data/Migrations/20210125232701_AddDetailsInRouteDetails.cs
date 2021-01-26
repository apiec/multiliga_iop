using Microsoft.EntityFrameworkCore.Migrations;

namespace MultiLiga_IOP.Data.Migrations
{
    public partial class AddDetailsInRouteDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "RouteDetails",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Name",
                table: "RouteDetails",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "RouteDetails");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "RouteDetails");
        }
    }
}
