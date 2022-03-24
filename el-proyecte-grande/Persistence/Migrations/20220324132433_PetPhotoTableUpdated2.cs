using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PetPhotoTableUpdated2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "PetPhotos");

            migrationBuilder.AddColumn<string>(
                name: "Src",
                table: "PetPhotos",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Src",
                table: "PetPhotos");

            migrationBuilder.AddColumn<byte[]>(
                name: "Content",
                table: "PetPhotos",
                type: "BLOB",
                nullable: true);
        }
    }
}
