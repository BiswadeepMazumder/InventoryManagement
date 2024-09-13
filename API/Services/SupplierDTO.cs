using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class SupplierDTO
    {
        public string? SupplierName { get; set; }
        public string? SupplierAddress { get; set; }
        public string? SupplierCity { get; set; }
        public decimal? SupplierZipCode { get; set; }
        public decimal? SupplierPhoneNumber { get; set; }
    }
}