using System;
using System.Collections.Generic;

namespace API.Models;

public partial class SupplierToCategory
{
    public string CategoryCode { get; set; } = null!;

    public string SupplierId { get; set; } = null!;

    public int? Status { get; set; }

    public virtual Category CategoryCodeNavigation { get; set; } = null!;

    public virtual Supplier Supplier { get; set; } = null!;
}
