using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class DirectorViewModel
    {

        public int dire_Id { get; set; }
        public string dire_Nombres { get; set; }
        public string dire_Apellidos { get; set; }
        public DateTime? dire_FechaNacimiento { get; set; }
        public string dire_Sexo { get; set; }
        public int dire_UsuCrea { get; set; }

    }
}
