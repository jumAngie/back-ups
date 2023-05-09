using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class RolPantallasViewModel
    {
        public int ropa_Id { get; set; }
        public int ropa_Rol { get; set; }
        public int ropa_Pantalla { get; set; }
        public bool? ropa_Estado { get; set; }
        public int ropa_UserCrea { get; set; }
        public DateTime? ropa_FechaCrea { get; set; }
        public int? ropa_UserMofica { get; set; }
        public DateTime? ropa_FechaModifica { get; set; }
    }
}
