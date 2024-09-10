using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public partial class SupplierToCategory
{   
    [Key] 
    public string CategoryCode { get; set; } = null!;

    public string SupplierId { get; set; } = null!;

    public int? Status { get; set; }

    public virtual Category CategoryCodeNavigation { get; set; } = null!;

    public virtual Supplier Supplier { get; set; } = null!;
}
