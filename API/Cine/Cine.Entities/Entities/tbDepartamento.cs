﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class tbDepartamento
    {
        public tbDepartamento()
        {
            tbMunicipios = new HashSet<tbMunicipio>();
        }

        public int dept_Id { get; set; }
        public string dept_Descripcion { get; set; }
        public bool? dept_Estado { get; set; }
        public int dept_UserCrea { get; set; }
        public DateTime? dept_FechaCrea { get; set; }
        public int? dept_UserMofica { get; set; }
        public DateTime? dept_FechaModifica { get; set; }

        public virtual tbUsuario dept_UserCreaNavigation { get; set; }
        public virtual tbUsuario dept_UserMoficaNavigation { get; set; }
        public virtual ICollection<tbMunicipio> tbMunicipios { get; set; }
    }
}