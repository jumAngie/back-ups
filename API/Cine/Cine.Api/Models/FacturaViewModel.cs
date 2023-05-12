using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class FacturaViewModel
    {
        public int fact_Id { get; set; }
        public int? fact_Cliente { get; set; }
        public bool? fact_Estado { get; set; }
        public int fact_UsuCrea { get; set; }
        public DateTime? fact_FechaCrea { get; set; }
        public int? fact_UsuMofica { get; set; }
        public DateTime? fact_FechaModifica { get; set; }

    }
}
