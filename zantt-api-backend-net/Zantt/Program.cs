using Microsoft.EntityFrameworkCore;
using Zantt.Contexts;
using Zantt.Repositories;
using Zantt.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// * DB - EntitiyFramework DI
builder.Services.AddDbContext<ZanttContext>(
    (dbContextOptions) =>
    {
        var connectionString = builder.Configuration.GetConnectionString("ZanttConnection");
        dbContextOptions.UseMySql(
            connectionString,
            new MariaDbServerVersion(ServerVersion.AutoDetect(connectionString)));
    }
);

// * DI
builder.Services.AddScoped<ProjectService, ProjectService>();
builder.Services.AddScoped<ProjectRepository, ProjectRepository>();

// * DI - AutoMapper Profile
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<ZanttContext>();
    context.Database.EnsureCreated();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
