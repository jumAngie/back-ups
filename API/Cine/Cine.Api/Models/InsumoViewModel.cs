using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class InsumoViewModel
    {

        public int insu_Id { get; set; }
        public string insu_Descripcion { get; set; }
        public decimal insu_Precio { get; set; }
        public string insu_href { get; set; }
        public string insu_src { get; set; }
        public string insu_alt { get; set; }
        public bool? insu_Estado { get; set; }
        public int insu_UserCrea { get; set; }

    }
}
