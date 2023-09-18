using System;
namespace SocialNetworkApp.DatabaseConnection
{
	public class DatabaseConnectionContext: DbContext
	{
        public DatabaseConnectionContext(DbContextOptions<DatabaseConnectionContext> options) : base(options)
        {
        }

        public DbSet<Register> register { get; set; }
        public DbSet<Post> post { get; set; }
        public DbSet<Events> events { get; set; }
        public DbSet<Article> article { get; set; }
        public DbSet<Staff> staffs { get; set; }
 
    }
}



