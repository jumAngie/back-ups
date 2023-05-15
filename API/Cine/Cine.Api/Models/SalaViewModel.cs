using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class SalaViewModel
    {
        public int sala_Id { get; set; }
        public int sala_Butacas { get; set; }
        public int sala_Tipo { get; set; }
        public int sala_Sucursal { get; set; }
        public bool? sala_Estado { get; set; }
        public int sala_UserCrea { get; set; }
        public DateTime sala_FechaCrea { get; set; }
        public int? sala_UserMofica { get; set; }
        public DateTime? sala_FechaModifica { get; set; }
    }
}
