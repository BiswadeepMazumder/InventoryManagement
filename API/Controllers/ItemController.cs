
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
        public class ItemController : ControllerBase
        {
            private readonly InventoryDbContext _context;

            public ItemController(InventoryDbContext context)
            {
                _context = context;
            }

        // Get all items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemDTO>>> GetItems()
        {
            return await _context.Items
                .Select(i => new ItemDTO
                {
                    ItemId = i.ItemId,
                    ItemName = i.ItemName,
                    ItemUnitPrice = i.ItemUnitPrice,
                    CurrentStock = i.CurrentStock,
                    Status = i.Status,
                    CategoryCode = i.CategoryCode
                })
                .ToListAsync();
        }


         // GET: api/items{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDTO>> GetItem(string id)
        {
            var item = await _context.Items
                .Where(i => i.ItemId == id)
                .Select(i => new ItemDTO
                {
                    ItemId = i.ItemId,
                    ItemName = i.ItemName,
                    ItemUnitPrice = i.ItemUnitPrice,
                    CurrentStock = i.CurrentStock,
                    Status = i.Status,
                    CategoryCode = i.CategoryCode
                })
                .FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

         // POST: api/items
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItem), new { id = item.ItemId }, item);
        }

         // PUT: api/items/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(string id, Item item)
        {
            if (id != item.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
         // DELETE: api/items/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(string id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(string id)
        {
            return _context.Items.Any(e => e.ItemId == id);
        }

    }
}