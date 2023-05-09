using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class CargoViewModel
    {
        public int carg_Id { get; set; }
        public string carg_Cargo { get; set; }
        public bool? car_Estado { get; set; }
        public int carg_UsuarioCreador { get; set; }
        public DateTime? carg_FechaCreacion { get; set; }
        public int? carg_UsuarioModificado { get; set; }
        public DateTime? carg_FechaModificacion { get; set; }
    }
}
