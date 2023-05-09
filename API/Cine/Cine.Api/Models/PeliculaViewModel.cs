using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Models
{
    public class PeliculaViewModel
    {
        public int      peli_Id { get; set; }
        public string   peli_Titulo { get; set; }
        public string   peli_TitulOriginal { get; set; }
        public int      peli_AnioEstreno { get; set; }
        public int      peli_Duracion { get; set; }
        public int      peli_Categoria { get; set; }
        public int      peli_Director { get; set; }
        public int      peli_UsuCrea { get; set; }
        public int?     peli_UsuMofica { get; set; }
    }
}
