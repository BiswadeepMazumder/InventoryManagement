using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public partial class Category
{
    public string? CategoryName { get; set; }
    [Key]    
    public string CategoryCode { get; set; } = null!;

    public int? Status { get; set; }

    public virtual ICollection<Item> Items { get; set; } = new List<Item>();

    public virtual ICollection<SupplierToCategory> SupplierToCategories { get; set; } = new List<SupplierToCategory>();
}
