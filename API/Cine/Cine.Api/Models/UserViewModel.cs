using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class UserViewModel
    {

        public int user_Id { get; set; }
        public string user_NombreUsuario { get; set; }
        public string user_Contrasenia { get; set; }
        public int user_Empleado { get; set; }
        public int user_Rol { get; set; }
        public bool user_EsAdmin { get; set; }
        public int user_UsuarioCrea { get; set; }

        public int? user_UsuarioModifica { get; set; }

    }
}
