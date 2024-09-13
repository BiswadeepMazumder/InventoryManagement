using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Category
{
    public string? CategoryName { get; set; }

    public string CategoryCode { get; set; } = null!;

    public int? Status { get; set; }

    public virtual ICollection<Items> Items { get; set; } = new List<Items>();

    public virtual ICollection<SupplierToCategory> SupplierToCategory { get; set; } = new List<SupplierToCategory>();
}
