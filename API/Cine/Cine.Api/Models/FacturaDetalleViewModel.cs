using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class ComboModel
    {
        public int id { get; set; }
        public int cantidad { get; set; }
    }

    public class ComboDetalleModel
    {
        public int id { get; set; }
        public int cantidad { get; set; }
    }
    public class FacturaDetalleViewModel
    {
        public int fade_Id { get; set; }
        public int? fade_Factura { get; set; }
        public int? fade_Proyeccion { get; set; }
        public int? fade_Tickets { get; set; }

        [NotMapped]
        public List<ComboModel> fade_ContenidoComboS { get; set; }
        [NotMapped]
        public List<ComboDetalleModel> fade_ContenidoInsumoS { get; set; }

        public string fade_ContenidoCombo { get; set; }
        public string fade_ContenidoInsumo { get; set; }
        public int? fade_Pago { get; set; }

        public int? fade_Total { get; set; }
        public bool? fade_Estado { get; set; }
        public int fade_UsuCrea { get; set; }
        public DateTime? fade_FechaCrea { get; set; }
        public int? fade_UsuMofica { get; set; }
        public DateTime? fade_FechaModifica { get; set; }
    }
}
