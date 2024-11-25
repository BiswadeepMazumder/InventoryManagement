
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
    public class OrderController : ControllerBase
    {
            private readonly InventoryDbContext _context;

            public OrderController(InventoryDbContext context)
                    {
                        _context = context;
                    }

                    // GET: api/Orders
            [Route("api/[controller]")]
           // [HttpGet("ViewAllOrders")]
           [HttpGet]
            [AllowAnonymous]
            public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrders()
                    {
                        var orders = await _context.Orders
                            .Include(o => o.OrderItems)
                            .Select(order => new OrderDTO
                            {
                                OrderId = order.OrderId,
                                OrderDate = order.OrderDate,
                                OrderName = order.OrderName,
                                UserId = order.UserId,
                                OrderAmount = order.OrderAmount,
                                OrderStatus = order.OrderStatus,
                                CancelComment = order.CancelComment,
                                OrderItems = order.OrderItems.Select(item => new OrderItemDTO
                                {
                                    OrderId = item.OrderId,
                                    ItemId = item.ItemId,
                                    OrderDate = item.OrderDate,
                                    ItemCount = item.ItemCount,
                                    ItemName = item.ItemName,
                                    TotalPrice = item.TotalPrice,
                                    OrderStatus = item.OrderStatus
                                }).ToList()
                            })
                            .ToListAsync();

                        return Ok(orders);
                    }

                    // GET: api/Orders/5
            [HttpGet("ViewOrderDetail{id}")]
            public async Task<ActionResult<OrderDTO>> GetOrder(string id)
                    {
                        var order = await _context.Orders
                            .Include(o => o.OrderItems)
                            .Where(o => o.OrderId == id)
                            .Select(order => new OrderDTO
                            {
                                OrderId = order.OrderId,
                                OrderDate = order.OrderDate,
                                OrderName = order.OrderName,
                                UserId = order.UserId,
                                OrderAmount = order.OrderAmount,
                                OrderStatus = order.OrderStatus,
                                CancelComment = order.CancelComment,
                                OrderItems = order.OrderItems.Select(item => new OrderItemDTO
                                {
                                    OrderId = item.OrderId,
                                    ItemId = item.ItemId,
                                    OrderDate = item.OrderDate,
                                    ItemCount = item.ItemCount,
                                    ItemName = item.ItemName,
                                    TotalPrice = item.TotalPrice,
                                    OrderStatus = item.OrderStatus
                                }).ToList()
                            })
                            .FirstOrDefaultAsync();

                        if (order == null)
                        {
                            return NotFound();
                        }

                        return order;
                    }

              // POST: api/Orders
        [HttpPost("CreateNewOrder")]
        public async Task<ActionResult<OrderDTO>> CreateOrder([FromBody]OrderDTO orderDTO)
        {
            var order = new Orders
            {
                OrderId = orderDTO.OrderId,
                OrderDate = orderDTO.OrderDate,
                OrderName = orderDTO.OrderName,
                UserId = orderDTO.UserId,
                OrderAmount = orderDTO.OrderAmount,
                OrderStatus = orderDTO.OrderStatus,
                CancelComment = orderDTO.CancelComment
            };

            _context.Orders.Add(order);

            foreach (var itemDTO in orderDTO.OrderItems)
            {
                var orderItem = new OrderItems
                {
                    OrderId = itemDTO.OrderId,
                    ItemId = itemDTO.ItemId,
                    OrderDate = itemDTO.OrderDate,
                    ItemCount = itemDTO.ItemCount,
                    ItemName = itemDTO.ItemName,
                    TotalPrice = itemDTO.TotalPrice,
                    OrderStatus = itemDTO.OrderStatus
                };

                _context.OrderItems.Add(orderItem);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, orderDTO);
        }

            
                    // PUT: api/Orders/5
            [HttpPut("ModifyOrder{id}")]
            public async Task<IActionResult> CancelOrder(string id, OrderDTO orderDTO)
            {
                if (id != orderDTO.OrderId)
                {
                    return BadRequest();
                }

                var order = await _context.Orders.FindAsync(id);
                if (order == null)
                {
                    return NotFound();
                }

                order.OrderDate = orderDTO.OrderDate;
                order.OrderName = orderDTO.OrderName;
                order.UserId = orderDTO.UserId;
                order.OrderAmount = orderDTO.OrderAmount;
                order.OrderStatus = orderDTO.OrderStatus;
                order.CancelComment = orderDTO.CancelComment;

                _context.Entry(order).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return NoContent();
            }

            // DELETE: api/Orders/5
            [HttpDelete("CancelOrder{id}")]
            public async Task<IActionResult> CancelOrder(string id)
            {
                var order = await _context.Orders.FindAsync(id);
                if (order == null)
                {
                    return NotFound();
                }

                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            // GET: api/Order/UpcomingOrders
            [HttpGet("UpcomingOrders")]
            public async Task<ActionResult<IEnumerable<OrderDTO>>> ViewUpcomingOrders()
            {
                var upcomingOrders = await _context.Orders
                    .Where(o => o.OrderStatus >= 3)
                    .Select(order => new OrderDTO
                    {
                        OrderId = order.OrderId,
                        OrderName = order.OrderName,
                        OrderDate = order.OrderDate,
                        OrderAmount = order.OrderAmount,
                        OrderStatus = order.OrderStatus,
                        CancelComment = order.CancelComment
                    })
                    .ToListAsync();

                return Ok(upcomingOrders);
            }

            // GET: api/Order/PastOrders
            [HttpGet("PastOrders")]
          public async Task<ActionResult<IEnumerable<OrderDTO>>> ViewPastOrders()

            {
                var pastOrders = await _context.Orders
                    .Where(o => o.OrderStatus == 5)
                    .Select(order => new OrderDTO
                    {
                        OrderId = order.OrderId,
                        OrderName = order.OrderName,
                        OrderDate = order.OrderDate,
                        OrderAmount = order.OrderAmount,
                        OrderStatus = order.OrderStatus,
                        CancelComment = order.CancelComment
                    })
                    .ToListAsync();

                return Ok(pastOrders);
            }

            
 }
}