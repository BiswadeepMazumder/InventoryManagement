using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public partial class User
{   
    [Key] 
    public string UserId { get; set; } = null!;

    public string? UserName { get; set; }

    public string? UserDescription { get; set; }

    public int? UserRole { get; set; }

    public int? Status { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
