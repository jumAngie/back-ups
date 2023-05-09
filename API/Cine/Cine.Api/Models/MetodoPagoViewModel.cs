using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class MetodoPagoViewModel
    {
        public int pago_Id { get; set; }
        public string pago_Descripcion { get; set; }
        public int? pago_Estado { get; set; }
        public int? pago_UsuarioCreador { get; set; }
        public DateTime? pago_FechaCreacion { get; set; }
        public int? pago_UsuarioModificador { get; set; }
        public DateTime? pago_FechaModificacion { get; set; }
    }
}
