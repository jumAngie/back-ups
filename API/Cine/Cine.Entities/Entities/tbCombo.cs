﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class tbCombo
    {
        public tbCombo()
        {
            tbComboDetalles = new HashSet<tbComboDetalle>();
        }

        public int comb_Id { get; set; }
        public string comb_Descripcion { get; set; }
        public decimal comb_Precio { get; set; }
        public bool? comb_Estado { get; set; }
        public int comb_UserCrea { get; set; }
        public DateTime comb_FechaCrea { get; set; }
        public int? comb_UsuarioModifica { get; set; }
        public DateTime? comb_FechaModifica { get; set; }

        public virtual tbUsuario comb_UserCreaNavigation { get; set; }
        public virtual tbUsuario comb_UsuarioModificaNavigation { get; set; }
        public virtual ICollection<tbComboDetalle> tbComboDetalles { get; set; }
    }
}