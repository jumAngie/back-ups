using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class SucursalViewModel
    {
        public int sucu_Id { get; set; }
        public string sucu_Nombre { get; set; }
        public string sucu_Direccion { get; set; }
        public int sucu_Ciudad { get; set; }
        public int sucu_UserCrea { get; set; }
    }
}
