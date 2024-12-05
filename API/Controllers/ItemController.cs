using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace API.Controllers
{
    // Route attribute defines the base URL for this controller as "api/Item"
    [Route("api/[controller]")]
    [ApiController] // Indicates this is an API controller (automatically handles JSON serialization, etc.)
    public class ItemController : ControllerBase
    {
        // Dependency injection of the database context for interacting with the database
        private readonly InventoryDbContext _context;

        // Constructor initializes the database context
        public ItemController(InventoryDbContext context)
        {
            _context = context;
        }

        // GET: api/All_Items - Fetch all items from the database
        [HttpGet]
        [AllowAnonymous] // Allows access without authentication
        public async Task<ActionResult<IEnumerable<ItemDTO>>> GetItems()
        {
            // Selects all items from the database and maps them to ItemDTO objects
            var items = await _context.Items.Select(item => new ItemDTO
            {
                ItemId = item.ItemId,
                ItemName = item.ItemName,
                ItemUnitPrice = item.ItemUnitPrice,
                CurrentStock = item.CurrentStock,
                Status = item.Status,
                CategoryCode = item.CategoryCode
            }).ToListAsync();

            // Returns the list of items in JSON format with HTTP 200 (OK)
            return Ok(items);
        }

        // GET: api/LowStock Items - Fetch items with stock below a threshold
        [HttpGet("lowstock")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ItemDTO>>> GetLowStockItems()
        {
            // Filters items with stock less than 500, orders them by stock, and takes the top 5
            var lowStockItems = await _context.Items
                .Where(item => item.CurrentStock < 500)
                .OrderBy(item => item.CurrentStock)
                .Take(5)
                .Select(item => new ItemDTO
                {
                    ItemId = item.ItemId,
                    ItemName = item.ItemName,
                    ItemUnitPrice = item.ItemUnitPrice,
                    CurrentStock = item.CurrentStock,
                    Status = item.Status,
                    CategoryCode = item.CategoryCode
                })
                .ToListAsync();

            // Returns the filtered list of low-stock items
            return Ok(lowStockItems);
        }

        // GET: api/Item/5 - Fetch a single item by its ID
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ItemDTO>> GetItem(string id)
        {
            // Finds the item in the database using the provided ID
            var item = await _context.Items.FindAsync(id);

            // Returns HTTP 404 (Not Found) if the item does not exist
            if (item == null)
            {
                return NotFound();
            }

            // Maps the found item to an ItemDTO object
            var itemDTO = new ItemDTO
            {
                ItemId = item.ItemId,
                ItemName = item.ItemName,
                ItemUnitPrice = item.ItemUnitPrice,
                CurrentStock = item.CurrentStock,
                Status = item.Status,
                CategoryCode = item.CategoryCode
            };

            // Returns the item in JSON format
            return Ok(itemDTO);
        }

        // POST: api/Item - Add a new item to the database
        [HttpPost]
        public async Task<ActionResult<ItemDTO>> PostItem([FromBody] ItemDTO itemDTO)
        {
            // Validates the incoming data
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Maps the incoming DTO to an Items entity
            var item = new Items
            {
                ItemId = itemDTO.ItemId,
                ItemName = itemDTO.ItemName,
                ItemUnitPrice = itemDTO.ItemUnitPrice,
                CurrentStock = itemDTO.CurrentStock,
                Status = itemDTO.Status,
                CategoryCode = itemDTO.CategoryCode
            };

            // Adds the new item to the database context
            _context.Items.Add(item);

            try
            {
                // Saves changes to the database
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException); // Logs any exception for debugging
            }

            // Returns HTTP 201 (Created) with a link to the new resource
            return CreatedAtAction(nameof(GetItem), new { id = item.ItemId }, itemDTO);
        }

        // PUT: api/Item/5 - Update an existing item in the database
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(string id, ItemDTO itemDTO)
        {
            // Validates that the ID in the URL matches the ID in the DTO
            if (id != itemDTO.ItemId)
            {
                return BadRequest();
            }

            // Finds the existing item in the database
            var item = await _context.Items.FindAsync(id);

            // Returns HTTP 404 (Not Found) if the item does not exist
            if (item == null)
            {
                return NotFound();
            }

            // Updates the item's properties with the new data
            item.ItemName = itemDTO.ItemName;
            item.ItemUnitPrice = itemDTO.ItemUnitPrice;
            item.CurrentStock = itemDTO.CurrentStock;
            item.Status = itemDTO.Status;
            item.CategoryCode = itemDTO.CategoryCode;

            // Marks the entity as modified
            _context.Entry(item).State = EntityState.Modified;

            try
            {
                // Saves the changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Checks if the item still exists in case of a concurrency conflict
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw; // Re-throws the exception if it's not an existence issue
                }
            }

            // Returns HTTP 204 (No Content) on successful update
            return NoContent();
        }

        // DELETE: api/Item/5 - Remove an item from the database
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(string id)
        {
            // Finds the item in the database using the provided ID
            var item = await _context.Items.FindAsync(id);

            // Returns HTTP 404 (Not Found) if the item does not exist
            if (item == null)
            {
                return NotFound();
            }

            // Removes the item from the database context
            _context.Items.Remove(item);

            // Saves changes to the database
            await _context.SaveChangesAsync();

            // Returns HTTP 204 (No Content) on successful deletion
            return NoContent();
        }

        // Helper method to check if an item exists in the database
        private bool ItemExists(string id)
        {
            return _context.Items.Any(e => e.ItemId == id);
        }
    }
}
