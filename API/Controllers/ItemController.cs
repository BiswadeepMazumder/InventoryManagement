
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

         // POST: api/items  (create item)
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(ItemDTO itemDto)
        {
            // Create an instance of Item from ItemDTO
            var item = new Item
            {
                ItemId = itemDto.ItemId,
                ItemName = itemDto.ItemName,
                ItemUnitPrice = itemDto.ItemUnitPrice,
                CurrentStock = itemDto.CurrentStock,
                Status = itemDto.Status,
                CategoryCode = itemDto.CategoryCode
            };

                // Add the new item to the Items DbSet
                _context.Items.Add(item);
                
                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return the created item and the location where it can be retrieved
                return CreatedAtAction(nameof(GetItem), new { id = item.ItemId }, item);

        }




         // PUT: api/items/{id}         (update item)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(string id, ItemDTO itemDto)
        {
            // Check if the provided id matches the ItemDTO's ItemId
            if (id != itemDto.ItemId)
            {
                return BadRequest("Item ID mismatch");
            }

            // Fetch the existing item from the database
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound("Item not found");
            }

            // Map the updated values from the ItemDTO to the existing item
            item.ItemName = itemDto.ItemName;
            item.ItemUnitPrice = itemDto.ItemUnitPrice;
            item.CurrentStock = itemDto.CurrentStock;
            item.Status = itemDto.Status;
            item.CategoryCode = itemDto.CategoryCode;

            // Mark the item as modified in the context
            _context.Entry(item).State = EntityState.Modified;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Check if the item still exists, otherwise return NotFound
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Return NoContent (204) if the update was successful
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