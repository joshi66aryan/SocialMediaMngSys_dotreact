global using SocialNetworkApp.DatabaseConnection;
global using  Microsoft.EntityFrameworkCore;
global using SocialNetworkApp.Model;
global using System.Collections.Generic;

using SocialNetworkApp.Repositories.Users;
using SocialNetworkApp.Repositories.PostRepo;
using SocialNetworkApp.Repositories.ArticleRepo;
using SocialNetworkApp.Repositories.StaffRepo;
using SocialNetworkApp.Repositories.EventRepo;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// it is going to configure sql server, using connection strings and connect with database.
builder.Services.AddDbContext<DatabaseConnectionContext>(
    options =>
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("DefaultConnection")
         )
);


// adding cors policy for trasnfering data that are hosted in another hosting platform.

var AllowLocalhost = "_AllowLocalhost";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// For Repositories (accessing database separately.)
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IArticleRepository, ArticleRepository>();
builder.Services.AddScoped<IStaffRepository, StaffRepository>();
builder.Services.AddScoped<IEventRepository, EventRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// Configure the static files middleware to serve files from the "ImageFile" folder

app.UseStaticFiles(new StaticFileOptions
{
    // Set the FileProvider to a PhysicalFileProvider pointing to the "Images" folder

    FileProvider = new PhysicalFileProvider(Path.Combine(app.Environment.ContentRootPath, "ImageFiles")),

    RequestPath = "/ImageFiles"         // Set the RequestPath to "/Images" so that requests to "/Images" will be served from the "Images" folder

});

// for cors policy.
app.UseCors(AllowLocalhost);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

 