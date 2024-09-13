using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Supplier
{
    public string SupplierId { get; set; } = null!;

    public string? SupplierName { get; set; }

    public string? SupplierAddress { get; set; }

    public string? SupplierCity { get; set; }

    public decimal? SupplierZipCode { get; set; }

    public decimal? SupplierPhoneNumber { get; set; }

    public DateTime? SupplierLastOrderDate { get; set; }

    public int? Status { get; set; }

    public virtual ICollection<SupplierToCategory> SupplierToCategory { get; set; } = new List<SupplierToCategory>();
}
