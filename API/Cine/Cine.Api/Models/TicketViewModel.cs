using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class TicketViewModel
    {

        public int tick_Id { get; set; }
        public int? tick_Factura { get; set; }
        public int? tick_Proyeccion { get; set; }
        public int? tick_Asiento { get; set; }
        public bool? tick_Estado { get; set; }
        public int tick_UsuCrea { get; set; }
        public DateTime? tick_FechaCrea { get; set; }
        public int? tick_UsuMofica { get; set; }
        public DateTime? tick_FechaModifica { get; set; }

    }
}
