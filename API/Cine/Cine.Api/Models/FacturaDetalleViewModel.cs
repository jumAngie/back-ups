using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class FacturaDetalleViewModel
    {
        public int fade_Id { get; set; }
        public int? fade_Factura { get; set; }
        public int? fade_Proyeccion { get; set; }
        public int? fade_ComboDetalle { get; set; }
        public bool? fade_Estado { get; set; }
        public int fade_UsuCrea { get; set; }
        public DateTime? fade_FechaCrea { get; set; }
        public int? fade_UsuMofica { get; set; }
        public DateTime? fade_FechaModifica { get; set; }
    }
}
