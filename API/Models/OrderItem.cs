using System;
using System.Collections.Generic;

namespace API.Models;

public partial class OrderItem
{
    public string OrderId { get; set; } = null!;

    public string ItemId { get; set; } = null!;

    public DateTime OrderDate { get; set; }

    public int? ItemCount { get; set; }

    public string? ItemName { get; set; }

    public decimal? TotalPrice { get; set; }

    public string? OrderStatus { get; set; }

    public virtual Item Item { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;
}
