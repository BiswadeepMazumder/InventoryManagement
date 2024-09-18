
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
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly InventoryDbContext _context;

        public ItemController(InventoryDbContext context)
        {
            _context = context;
        }

        // GET: api/Item
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ItemDTO>>> GetItems()
        {
            var items = await _context.Items.Select(item => new ItemDTO
            {
                ItemId = item.ItemId,
                ItemName = item.ItemName,
                ItemUnitPrice = item.ItemUnitPrice,
                CurrentStock = item.CurrentStock,
                Status = item.Status,
                CategoryCode = item.CategoryCode
            }).ToListAsync();

            return Ok(items);
        }

        // GET: api/Item/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ItemDTO>> GetItem(string id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            var itemDTO = new ItemDTO
            {
                ItemId = item.ItemId,
                ItemName = item.ItemName,
                ItemUnitPrice = item.ItemUnitPrice,
                CurrentStock = item.CurrentStock,
                Status = item.Status,
                CategoryCode = item.CategoryCode
            };

            return Ok(itemDTO);
        }

        // POST: api/Item
       [HttpPost]
public async Task<ActionResult<ItemDTO>> PostItem([FromBody] ItemDTO itemDTO)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    var item = new Items
    {
        ItemId = itemDTO.ItemId,
        ItemName = itemDTO.ItemName,
        ItemUnitPrice = itemDTO.ItemUnitPrice,
        CurrentStock = itemDTO.CurrentStock,
        Status = itemDTO.Status,
        CategoryCode = itemDTO.CategoryCode
    };

    _context.Items.Add(item);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetItem), new { id = item.ItemId }, itemDTO);
}

        // PUT: api/Item/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(string id, ItemDTO itemDTO)
        {
            if (id != itemDTO.ItemId)
            {
                return BadRequest();
            }

            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            item.ItemName = itemDTO.ItemName;
            item.ItemUnitPrice = itemDTO.ItemUnitPrice;
            item.CurrentStock = itemDTO.CurrentStock;
            item.Status = itemDTO.Status;
            item.CategoryCode = itemDTO.CategoryCode;

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

        // DELETE: api/Item/5
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