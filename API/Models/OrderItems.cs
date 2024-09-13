using System;
using System.Collections.Generic;

namespace API.Models;

public partial class OrderItems
{
    public string OrderId { get; set; } = null!;

    public string ItemId { get; set; } = null!;

    public DateTime OrderDate { get; set; }

    public int? ItemCount { get; set; }

    public string? ItemName { get; set; }

    public decimal? TotalPrice { get; set; }

    public int? OrderStatus { get; set; }

    public virtual Items Item { get; set; } = null!;

    public virtual Orders Order { get; set; } = null!;
}
