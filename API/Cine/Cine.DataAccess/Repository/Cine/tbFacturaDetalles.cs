using System;
using System.Collections.Generic;
using System.Text;

namespace Cine.DataAccess.Repository.Cine
{
    public class tbFacturaDetalles
    {
        public int fade_Id { get; set; }
        public int? fade_Factura { get; set; }
        public int? fade_Proyeccion { get; set; }
        public int? fade_Tickets { get; set; }
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
