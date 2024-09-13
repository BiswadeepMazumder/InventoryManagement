using System;
using System.Collections.Generic;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

public partial class InventoryDbContext : DbContext
{
    public InventoryDbContext()
    {
    }

    public InventoryDbContext(DbContextOptions<InventoryDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Item> Items { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Supplier> Suppliers { get; set; }

    public virtual DbSet<SupplierToCategory> SupplierToCategories { get; set; }

    public virtual DbSet<User> Users { get; set; }

     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            // Fetch connection string from the environment variable

            // setting connection string in enviroment
            // export CONNECTION_STRING="your conn str"
            var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");

            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("Connection string not found in environment variables.");
            }

            optionsBuilder.UseSqlServer(connectionString,options => 
                                            options.EnableRetryOnFailure(   maxRetryCount: 5, // Number of retries
                                                                            maxRetryDelay: TimeSpan.FromSeconds(30), // Delay between retries
                                                                            errorNumbersToAdd: null
                                                                         ));
        }
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryCode).HasName("PK__Category__371BA954C5484BBC");

            entity.ToTable("Category");

            entity.Property(e => e.CategoryCode)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CategoryName)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.ItemId).HasName("PK__Items__727E83EB42918CCC");

            entity.Property(e => e.ItemId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("ItemID");
            entity.Property(e => e.CategoryCode)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.ItemName).HasMaxLength(100);
            entity.Property(e => e.ItemUnitPrice).HasColumnType("decimal(15, 2)");

            entity.HasOne(d => d.CategoryCodeNavigation).WithMany(p => p.Items)
                .HasForeignKey(d => d.CategoryCode)
                .HasConstraintName("FK__Items__CategoryC__3D2915A8");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAF816AFBCD");

            entity.Property(e => e.OrderId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("OrderID");
            entity.Property(e => e.CancelComment)
                .HasMaxLength(550)
                .IsUnicode(false);
            entity.Property(e => e.OrderAmount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.OrderDate).HasColumnType("datetime");
            entity.Property(e => e.OrderName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UserId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Orders__UserID__44CA3770");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => new { e.OrderId, e.ItemId, e.OrderDate }).HasName("PK__OrderIte__2FC13393A166CDF7");

            entity.Property(e => e.OrderId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("OrderID");
            entity.Property(e => e.ItemId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("ItemID");
            entity.Property(e => e.OrderDate).HasColumnType("datetime");
            entity.Property(e => e.ItemName).HasMaxLength(100);
            entity.Property(e => e.OrderStatus)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Item).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.ItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OrderItem__ItemI__489AC854");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OrderItem__Order__498EEC8D");
        });

        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.HasKey(e => e.SupplierId).HasName("PK__Supplier__4BE666949A3DD70F");

            entity.ToTable("Supplier");

            entity.Property(e => e.SupplierId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("SupplierID");
            entity.Property(e => e.SupplierAddress)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SupplierCity)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.SupplierLastOrderDate).HasColumnType("datetime");
            entity.Property(e => e.SupplierName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SupplierPhoneNumber).HasColumnType("numeric(10, 0)");
            entity.Property(e => e.SupplierZipCode).HasColumnType("numeric(5, 0)");
        });

        modelBuilder.Entity<SupplierToCategory>(entity =>
        {
            entity.HasKey(e => new { e.CategoryCode, e.SupplierId }).HasName("PK__Supplier__63A5CF3D7C4EA5C1");

            entity.ToTable("SupplierToCategory");

            entity.Property(e => e.CategoryCode)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.SupplierId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("SupplierID");

            entity.HasOne(d => d.CategoryCodeNavigation).WithMany(p => p.SupplierToCategories)
                .HasForeignKey(d => d.CategoryCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SupplierT__Categ__339FAB6E");

            entity.HasOne(d => d.Supplier).WithMany(p => p.SupplierToCategories)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SupplierT__Suppl__3493CFA7");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC3E84EEF6");

            entity.Property(e => e.UserId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("UserID");
            entity.Property(e => e.UserDescription)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UserName)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
