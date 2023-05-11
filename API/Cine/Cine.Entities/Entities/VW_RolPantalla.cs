﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class VW_RolPantalla
    {
        public int ropa_Id { get; set; }
        public int ropa_Rol { get; set; }
        public int ropa_Pantalla { get; set; }
        public bool ropa_Estado { get; set; }
        public int ropa_UserCrea { get; set; }

        [NotMapped]
        public string panta_Descripcion { get; set; }

        [NotMapped]
        public string role_Nombre { get; set; }

        [NotMapped]
        public int panta_Id { get; set; }

        [NotMapped]
        public int role_Id { get; set; }

        [NotMapped]
        public string panta_URL { get; set; }

        [NotMapped]
        public string panta_Menu { get; set; }

        [NotMapped]
        public string panta_Item { get; set; }


        [NotMapped]
        public string panta_Label { get; set; }

        [NotMapped]
        public string panta_Icono { get; set; }

        [NotMapped]
        public bool esAdmin { get; set; }

        public DateTime? ropa_FechaCrea { get; set; }
        public int? ropa_UserMofica { get; set; }
        public DateTime? ropa_FechaModifica { get; set; }
    }
}