using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class CreateOrderItemDTO
    {
        public string ItemId { get; set; }
         public int ItemCount { get; set; }
         public string ItemName { get; set; }
        public decimal TotalPrice { get; set; }
    }
}