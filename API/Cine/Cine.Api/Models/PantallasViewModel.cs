using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class PantallasViewModel
    {
        public int panta_Id { get; set; }
        public string panta_Descripcion { get; set; }
        public string panta_URL { get; set; }
        public string panta_Menu { get; set; }
        public string panta_Item { get; set; }
        public bool? panta_Estado { get; set; }
        public int panta_UserCrea { get; set; }
        public DateTime? panta_FechaCrea { get; set; }
        public int? panta_UserMofica { get; set; }
        public DateTime? panta_FechaModifica { get; set; }
    }
}
