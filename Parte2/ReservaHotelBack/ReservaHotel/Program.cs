using Microsoft.EntityFrameworkCore;
using ReservaHotel.Config;
using ReservaHotel.Infra.Core;
using ReservaHotel.Repository;
using ReservaHotel.Repository.Interfaces;
using ReservaHotel.Services;
using ReservaHotel.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.Configure<ConfigurationService>(builder.Configuration.GetSection("Configuration"));
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseNpgsql(connection));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200", "http://localhost:4201")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<IFoodService, FoodService>();
builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

builder.Services.AddScoped<IRoomRepository, RoomRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IFoodRepository, FoodRepository>();
builder.Services.AddScoped<IBookingRepository, BookingRepository>();

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();
app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
