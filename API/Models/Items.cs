using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Items
{
    public string ItemId { get; set; } = null!;

    public string? ItemName { get; set; }

    public decimal? ItemUnitPrice { get; set; }

    public int? CurrentStock { get; set; }

    public int? Status { get; set; }

    public string? CategoryCode { get; set; }

    public virtual Category? CategoryCodeNavigation { get; set; }

    public virtual ICollection<OrderItems> OrderItems { get; set; } = new List<OrderItems>();
}
