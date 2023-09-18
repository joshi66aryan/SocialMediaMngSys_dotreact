using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialNetworkApp.Migrations
{
    /// <inheritdoc />
    public partial class AddTypeToRegisterTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "register",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "register");
        }
    }
}
