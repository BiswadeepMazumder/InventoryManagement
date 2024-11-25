
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
        [HttpPost("CreateOrder")]
    public async Task<ActionResult<OrderDTO>> CreateOrder([FromBody] OrderDTO orderDTO)
    {
        // Validate the incoming order data
        // if (orderDTO == null || orderDTO.OrderItems == null || orderDTO.OrderItems.Count == 0)
        // {
        //     return BadRequest("Order data or items are missing.");
        // }

        // Manually generate OrderId (you can also use a GUID or sequential logic here)
        var orderId = GenerateOrderId(); // Replace with your custom logic for order ID generation

        // Create a new order instance
        var order = new Orders
        {
            OrderId = orderId,  // Manually set OrderId
            OrderDate = orderDTO.OrderDate,
            OrderName = orderDTO.OrderName,
            UserId = orderDTO.UserId,
            OrderAmount = orderDTO.OrderAmount,
            OrderStatus = orderDTO.OrderStatus,
            CancelComment = orderDTO.CancelComment
        };

        try
        {
            // Add the order to the Orders table
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();  // Save to persist the order

            // Process each order item and link it to the newly created order
            foreach (var itemDTO in orderDTO.OrderItems)
            {
                var orderItem = new OrderItems
                {
                    OrderId = order.OrderId,  // Link to the newly created OrderId
                    ItemId = itemDTO.ItemId,  // Provided ItemId for the order item
                    OrderDate = itemDTO.OrderDate,
                    ItemCount = itemDTO.ItemCount,
                    ItemName = itemDTO.ItemName,  // You can also retrieve this from the Items table if needed
                    TotalPrice = itemDTO.TotalPrice,
                    OrderStatus = itemDTO.OrderStatus
                };

                // Add the order item to the OrderItems table
                _context.OrderItems.Add(orderItem);
            }

            // Save the order items to the database
            await _context.SaveChangesAsync();

            // Return the created order along with its items
            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, orderDTO);
        }
        catch (Exception ex)
        {
            // Return error if something goes wrong
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
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

            [HttpPut("CancelOrder/{id}")]
            public async Task<IActionResult> CancelOrder(string id, [FromBody] CancelOrderDTO cancelOrderDTO)
            {
                if (id != cancelOrderDTO.OrderId)
                {
                    return BadRequest("Order ID mismatch");
                }

                var order = await _context.Orders.FindAsync(id);
                if (order == null)
                {
                    return NotFound();
                }

                // Check if the order's status is 1 (which means it is eligible for cancellation)
                if (order.OrderStatus != 1)
                {
                    return BadRequest("Order cannot be cancelled anymore. Please contact the supplier.");
                }

                // Update the cancel comment and order status
                order.CancelComment = cancelOrderDTO.CancelComment;
                order.OrderStatus = 0;  // Change the order status to '0' (Canceled)

                // Save the changes to the database
                _context.Entry(order).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                // Return the updated order details
                return Ok(new OrderDTO
                {
                    OrderId = order.OrderId,
                    OrderDate = order.OrderDate,
                    OrderName = order.OrderName,
                    UserId = order.UserId,
                    OrderAmount = order.OrderAmount,
                    OrderStatus = order.OrderStatus,
                    CancelComment = order.CancelComment
                });
            }


            // GET: api/Order/UpcomingOrders
            [HttpGet("UpcomingOrders")]
            public async Task<ActionResult<IEnumerable<OrderDTO>>> ViewUpcomingOrders()
            {
                var upcomingOrders = await _context.Orders
                    .Where(o => o.OrderStatus == 3 || o.OrderStatus == 4)
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

            // Sample OrderId generation method (you can replace this with your actual logic)
    private string GenerateOrderId()
    {
        // Simple example: generates OrderId in format 'OD' + current date + random number
        return "OD" + "_" + new Random().Next(1111, 9999).ToString();
    }
 }
}