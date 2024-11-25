using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class CreateOrderDTO
    {
        public string OrderName { get; set; }
          public decimal OrderAmount { get; set; }
         public List<CreateOrderItemDTO> OrderItems { get; set; }
    }
}