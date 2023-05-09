﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class tbSala
    {
        public tbSala()
        {
            tbAsientos = new HashSet<tbAsiento>();
            tbProyecciones = new HashSet<tbProyeccione>();
        }

        public int sala_Id { get; set; }
        public int sala_Butacas { get; set; }
        public string sala_Tipo { get; set; }
        public int sala_Sucursal { get; set; }
        public bool? sala_Estado { get; set; }
        public int sala_UserCrea { get; set; }
        public DateTime sala_FechaCrea { get; set; }
        public int? sala_UserMofica { get; set; }
        public DateTime? sala_FechaModifica { get; set; }

        public virtual tbSucursale sala_SucursalNavigation { get; set; }
        public virtual tbUsuario sala_UserCreaNavigation { get; set; }
        public virtual tbUsuario sala_UserMoficaNavigation { get; set; }
        public virtual ICollection<tbAsiento> tbAsientos { get; set; }
        public virtual ICollection<tbProyeccione> tbProyecciones { get; set; }
    }
}