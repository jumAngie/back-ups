using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class CombosViewModel
    {
        public int comb_Id { get; set; }
        public string comb_Descripcion { get; set; }
        public decimal comb_Precio { get; set; }
        public bool? comb_Estado { get; set; }
        public int comb_UserCrea { get; set; }
        public int? comb_UsuarioModifica { get; set; }
    }
}
