using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Fhirata.AspNetCore.Migrations
{
    public partial class _005 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CodeMappings",
                table: "Mappings",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodeMappings",
                table: "Mappings");
        }
    }
}
