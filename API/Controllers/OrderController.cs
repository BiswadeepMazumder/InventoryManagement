
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
using Microsoft.Extensions.Options;
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
public async Task<ActionResult<OrderDTO>> CreateOrder([FromBody] CreateOrderDTO createOrderDTO )
{
    if (createOrderDTO == null || createOrderDTO.OrderItems == null || createOrderDTO.OrderItems.Count == 0)
    {
        return BadRequest("Order items are missing.");
    }

    var orderId = GenerateOrderId();  // Generate OrderId
    var order = new Orders
    {
        OrderId = orderId,
        OrderDate = DateTime.Now,
        OrderName = createOrderDTO.OrderName,
        UserId = "US01",
        OrderAmount = createOrderDTO.OrderAmount,
        OrderStatus = 1, // Pending status
        CancelComment = ""
    };

    try
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();  // Save order to DB

        // Add items to the OrderItems table
        foreach (var itemDTO in createOrderDTO.OrderItems)
        {
            var orderItem = new OrderItems
            {
                OrderId = order.OrderId,
                ItemId = itemDTO.ItemId,
                OrderDate = DateTime.Now,
                ItemCount = itemDTO.ItemCount,
                ItemName = itemDTO.ItemName,
                TotalPrice = itemDTO.TotalPrice,
                OrderStatus = 1
            };

            _context.OrderItems.Add(orderItem);
        }

        await _context.SaveChangesAsync();

      

        return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, createOrderDTO);
    }
    catch (Exception ex)
    {
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

            // GET: api/Order/currentOrders
            [HttpGet("CurrentOrders")]
            public async Task<ActionResult<IEnumerable<OrderDTO>>> ViewCurrentOrders()
            {
                var currentOrders = await _context.Orders
                    .Where(o => o.OrderStatus == 1)
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

                return Ok(currentOrders);
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


             [HttpGet("GenerateInvoice/{orderId}")]
            public async Task<IActionResult> GenerateInvoice(string orderId)
            {
                // Fetch the order along with the items
                var order = await _context.Orders
                    .Include(o => o.OrderItems)
                    .Where(o => o.OrderId == orderId)
                    .FirstOrDefaultAsync();

                if (order == null)
                {
                    return NotFound("Order not found.");
                }

                // Generate the HTML body for the invoice
                var htmlBody = GenerateHtmlInvoice(order);

                // Return the HTML as the response
                return Content(htmlBody, "text/html");
            }

            private string GenerateHtmlInvoice(Orders order)
            {
                // Start with the basic HTML structure
                var htmlContent = $@"
                <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; }}
                        table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
                        th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
                        th {{ background-color: #f4f4f4; }}
                        .invoice-header {{ margin-bottom: 20px; }}
                        .total-amount {{ font-weight: bold; }}
                    </style>
                </head>
                <body>
                    <div class='invoice-header'>
                        <h1>Invoice for Order {order.OrderId}</h1>
                        <p><strong>Order Date:</strong> {order.OrderDate}</p>
                        <p><strong>Order Name:</strong> {order.OrderName}</p>
                        <p><strong>Order Amount:</strong> ${order.OrderAmount}</p>
                        <p><strong>Order Status:</strong> {(order.OrderStatus == 1 ? "Pending" : "Completed")}</p>
                        <p><strong>User ID:</strong> {order.UserId}</p>
                        <p><strong>Cancel Comment:</strong> {(string.IsNullOrEmpty(order.CancelComment) ? "N/A" : order.CancelComment)}</p>
                    </div>
                    
                    <h2>Order Items:</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Item Name</th>
                                <th>Item Count</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>";

                // Add each order item to the table
                foreach (var item in order.OrderItems)
                {
                    htmlContent += $@"
                        <tr>
                            <td>{item.ItemId}</td>
                            <td>{item.ItemName}</td>
                            <td>{item.ItemCount}</td>
                            <td>${item.TotalPrice}</td>
                        </tr>";
                }

                // Add total price at the bottom
                htmlContent += $@"
                        </tbody>
                    </table>

                    <div class='total-amount'>
                        <p><strong>Total Order Amount:</strong> ${order.OrderAmount}</p>
                    </div>

                </body>
                </html>";

                return htmlContent;
            }

    
 }
}