using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class OrderItemDTO
    {
            public string OrderId { get; set; } = null!;
            public string ItemId { get; set; } = null!;
            public DateTime OrderDate { get; set; }
            public int? ItemCount { get; set; }
            public string? ItemName { get; set; }
            public decimal? TotalPrice { get; set; }
            public int? OrderStatus { get; set; }
            
    }
}