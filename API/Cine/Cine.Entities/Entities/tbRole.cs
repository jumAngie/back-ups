﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class tbRole
    {
        public tbRole()
        {
            tbRolesPantallas = new HashSet<tbRolesPantalla>();
            tbUsuarios = new HashSet<tbUsuario>();
        }

        public int role_Id { get; set; }
        public string role_Nombre { get; set; }
        public int role_UsuCreacion { get; set; }
        public DateTime role_FechaCreacion { get; set; }
        public int? role_UsuModificacion { get; set; }
        public DateTime? role_FechaModificacion { get; set; }
        public bool? role_Estado { get; set; }

        public virtual tbUsuario role_UsuCreacionNavigation { get; set; }
        public virtual tbUsuario role_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbRolesPantalla> tbRolesPantallas { get; set; }
        public virtual ICollection<tbUsuario> tbUsuarios { get; set; }
    }
}