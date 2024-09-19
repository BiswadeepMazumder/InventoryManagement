using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class OrderDTO
    {
            public string OrderId { get; set; } = null!;
            public DateTime? OrderDate { get; set; }
            public string? OrderName { get; set; }
            public string? UserId { get; set; }
            public decimal? OrderAmount { get; set; }
            public int? OrderStatus { get; set; }
            public string? CancelComment { get; set; }
            public List<OrderItemDTO> OrderItems { get; set; } = new List<OrderItemDTO>();

    }
}