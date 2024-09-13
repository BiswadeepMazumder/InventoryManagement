
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly InventoryDbContext _context;

        public SupplierController(InventoryDbContext context)
        {
            _context = context;
        }

        // GET: api/suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierDTO>>> GetSuppliers()
        {
            // Fetch suppliers and map them to DTO
            var suppliers = await _context.Suppliers.Select(s => new SupplierDTO
            {
                SupplierName = s.SupplierName,
                SupplierPhoneNumber = s.SupplierPhoneNumber,
                SupplierAddress = s.SupplierAddress,
                SupplierCity = s.SupplierCity,
                SupplierZipCode = s.SupplierZipCode
            }).ToListAsync();

            return Ok(suppliers);
        }
    }
}