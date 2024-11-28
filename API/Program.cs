using API.Data;
using API.Models;
using API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



// Enable CORS to allow cross-origin requests from the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


// Get the connection string from environment variable or from appsetting.json
// Check if the environment variable exists and override the connection string if present
var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING") 
                       ?? builder.Configuration.GetConnectionString("DefaultConnection");

//Console.WriteLine(connectionString);

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string not found.");
}

// Register the DbContext with the connection string from the environment variable
builder.Services.AddDbContext<InventoryDbContext>(options =>
    options.UseSqlServer(connectionString).EnableSensitiveDataLogging().LogTo(Console.WriteLine));

var app = builder.Build();


app.UseSwagger();

app.UseSwaggerUI();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1");
});

// Redirect root URL ("/") to Swagger UI
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        context.Response.Redirect("/swagger/index.html");
        return;
    }
    await next();
});
   
// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
//    { app.UseSwagger();
//     // to use swagger ui in production
//     app.UseSwaggerUI();
//    }
   


app.UseRouting();
app.UseExceptionHandler("/error");
app.UseHsts();
app.UseHttpsRedirection();
// Use CORS policy that allows all origins, methods, and headers
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();
app.Run();
