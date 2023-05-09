using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class ClientesViewModel
    {
        public int clie_Id { get; set; }
        public string clie_Nombres { get; set; }
        public string clie_Apellidos { get; set; }
        public string clie_RTN { get; set; }
        public bool? clie_Estado { get; set; }
        public int clie_UserCrea { get; set; }
        public DateTime? clie_FechaCrea { get; set; }
        public int? clie_UserModifica { get; set; }
        public DateTime? clie_FechaModifica { get; set; }
    }
}
