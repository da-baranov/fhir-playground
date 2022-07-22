using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Fhirata.AspNetCore.Migrations
{
    public partial class _002 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMappingOption_AspNetUsers_UserId",
                table: "UserMappingOption");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserMappingOption",
                table: "UserMappingOption");

            migrationBuilder.RenameTable(
                name: "UserMappingOption",
                newName: "Mappings");

            migrationBuilder.RenameIndex(
                name: "IX_UserMappingOption_UserId",
                table: "Mappings",
                newName: "IX_Mappings_UserId");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "Mappings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Expression",
                table: "Mappings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Json",
                table: "Mappings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Mappings",
                table: "Mappings",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Mappings_Name",
                table: "Mappings",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Mappings_AspNetUsers_UserId",
                table: "Mappings",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mappings_AspNetUsers_UserId",
                table: "Mappings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Mappings",
                table: "Mappings");

            migrationBuilder.DropIndex(
                name: "IX_Mappings_Name",
                table: "Mappings");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "Mappings");

            migrationBuilder.DropColumn(
                name: "Expression",
                table: "Mappings");

            migrationBuilder.DropColumn(
                name: "Json",
                table: "Mappings");

            migrationBuilder.RenameTable(
                name: "Mappings",
                newName: "UserMappingOption");

            migrationBuilder.RenameIndex(
                name: "IX_Mappings_UserId",
                table: "UserMappingOption",
                newName: "IX_UserMappingOption_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserMappingOption",
                table: "UserMappingOption",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMappingOption_AspNetUsers_UserId",
                table: "UserMappingOption",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
