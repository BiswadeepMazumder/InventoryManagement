
using System;
using System.Collections.Generic;
using System.Linq;
using API.Data;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class SupplierController : ControllerBase
    {
        private readonly InventoryDbContext _context;

        public SupplierController(InventoryDbContext context)
        {
            _context = context;
        }

        // GET: api/suppliers
        [HttpGet("suppliers")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<SupplierDTO>>> GetSuppliers()
        {
            // Fetch suppliers and map them to DTO
            var suppliers = await _context.Supplier.Select(s => new SupplierDTO
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