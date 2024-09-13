using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class ItemDTO
    {
        public string ItemId { get; set; } = null!;
        public string? ItemName { get; set; }
        public decimal? ItemUnitPrice { get; set; }
        public int? CurrentStock { get; set; }
        public int? Status { get; set; }
        public string? CategoryCode { get; set; }
    }
}