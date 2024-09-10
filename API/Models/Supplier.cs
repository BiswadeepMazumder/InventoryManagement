using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public partial class Supplier
{
    [Key] 
    public string SupplierId { get; set; } = null!;

    public string? SupplierName { get; set; }

    public string? SupplierAddress { get; set; }

    public string? SupplierCity { get; set; }

    public decimal? SupplierZipCode { get; set; }

    public decimal? SupplierPhoneNumber { get; set; }

    public DateTime? SupplierLastOrderDate { get; set; }

    public int? Status { get; set; }

    public virtual ICollection<SupplierToCategory> SupplierToCategories { get; set; } = new List<SupplierToCategory>();
}
