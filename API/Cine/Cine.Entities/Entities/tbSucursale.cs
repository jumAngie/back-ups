﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class tbSucursale
    {
        public tbSucursale()
        {
            tbSalas = new HashSet<tbSala>();
        }

        public int sucu_Id { get; set; }
        public string sucu_Nombre { get; set; }
        public string sucu_Direccion { get; set; }
        public int sucu_Ciudad { get; set; }
        public bool? sucu_Estado { get; set; }
        public int sucu_UserCrea { get; set; }
        public DateTime sucu_FechaCrea { get; set; }
        public int? sucu_UsuarioModifica { get; set; }
        public DateTime? sucu_FechaModifica { get; set; }

        public virtual tbMunicipio sucu_CiudadNavigation { get; set; }
        public virtual tbUsuario sucu_UserCreaNavigation { get; set; }
        public virtual tbUsuario sucu_UsuarioModificaNavigation { get; set; }
        public virtual ICollection<tbSala> tbSalas { get; set; }
    }
}