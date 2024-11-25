using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class CancelOrderDTO
    {
        public string OrderId { get; set; }
        public string CancelComment { get; set; }
    }
}