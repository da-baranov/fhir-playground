using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Fhirata.AspNetCore.Migrations
{
    public partial class _003 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Mappings_Name",
                table: "Mappings");

            migrationBuilder.DropIndex(
                name: "IX_Mappings_UserId",
                table: "Mappings");

            migrationBuilder.CreateIndex(
                name: "IX_Mappings_UserId_Name",
                table: "Mappings",
                columns: new[] { "UserId", "Name" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Mappings_UserId_Name",
                table: "Mappings");

            migrationBuilder.CreateIndex(
                name: "IX_Mappings_Name",
                table: "Mappings",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mappings_UserId",
                table: "Mappings",
                column: "UserId");
        }
    }
}
