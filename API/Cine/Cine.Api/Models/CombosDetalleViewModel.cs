using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class CombosDetalleViewModel
    {
        public int cdet_Id { get; set; }
        public int cdet_combId { get; set; }
        public int cdet_insuId { get; set; }
        public bool? cdet_Estado { get; set; }
        public int cdet_UserCrea { get; set; }
        public DateTime cdet_FechaCrea { get; set; }
        public int? cdet_UserMofica { get; set; }
        public DateTime? cdet_FechaModifica { get; set; }
    }
}
