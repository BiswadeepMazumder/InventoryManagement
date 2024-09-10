using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Item
{
    public string ItemId { get; set; } = null!;     // primary key

    public string? ItemName { get; set; }

    public decimal? ItemUnitPrice { get; set; }

    public int? CurrentStock { get; set; }

    public int? Status { get; set; }

    public string? CategoryCode { get; set; }       // Foreign Key (Nullable)

    public virtual Category? CategoryCodeNavigation { get; set; }  // Navigation Property for Category 
    //allows navigation from the one table to the another it belongs to.(here ITEM --> CATEGORY)
    // The virtual keyword enables lazy loading in Entity Framework, meaning the related Category entity is loaded only when accessed.
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>(); // Navigation Property for Category 
}
