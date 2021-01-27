using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MultiLiga_IOP.Data.Migrations
{
    public partial class IDontEvenKnow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RaceTime",
                table: "RaceSignUps");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Result",
                table: "RaceSignUps",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Result",
                table: "RaceSignUps");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "RaceTime",
                table: "RaceSignUps",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }
    }
}
