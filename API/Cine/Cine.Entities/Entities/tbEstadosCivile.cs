﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class tbEstadosCivile
    {
        public tbEstadosCivile()
        {
            tbEmpleados = new HashSet<tbEmpleado>();
        }

        public int estc_Id { get; set; }
        public string estc_Descripcion { get; set; }
        public bool? estc_Estado { get; set; }
        public int estc_UserCrea { get; set; }
        public DateTime? estc_FechaCrea { get; set; }
        public int? estc_UserMofica { get; set; }
        public DateTime? estc_FechaModifica { get; set; }

        public virtual tbUsuario estc_UserCreaNavigation { get; set; }
        public virtual tbUsuario estc_UserMoficaNavigation { get; set; }
        public virtual ICollection<tbEmpleado> tbEmpleados { get; set; }
    }
}