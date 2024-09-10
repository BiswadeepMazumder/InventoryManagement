using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public partial class Order
{
    [Key] 
    public string OrderId { get; set; } = null!;

    public DateTime? OrderDate { get; set; }

    public string? OrderName { get; set; }

    public string? UserId { get; set; }

    public decimal? OrderAmount { get; set; }

    public int? OrderStatus { get; set; }

    public string? CancelComment { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual User? User { get; set; }
}
