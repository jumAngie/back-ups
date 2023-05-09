using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class EmpleadoViewModel
    {
        public int empl_Id { get; set; }
        public string empl_DNI { get; set; }
        public string empl_Nombre { get; set; }
        public string empl_Apellidos { get; set; }
        public string empl_Sexo { get; set; }
        public int empl_Estadocivil { get; set; }
        public int empl_Muni { get; set; }
        public int empl_Cargo { get; set; }
        public int? empl_Sucursal { get; set; }
        public string empl_DireccionExacta { get; set; }
        public DateTime empl_FechaNacimiento { get; set; }
        public string empl_Telefono { get; set; }
        public int empl_UsuarioCreador { get; set; }

    }
}
