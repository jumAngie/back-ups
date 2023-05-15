using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class ProyeccionViewModel
    {

        public int proy_Id { get; set; }
        public int? proy_Pelicula { get; set; }
        public int? proy_Sala { get; set; }
        public int? proy_Horario { get; set; }

    }
}
