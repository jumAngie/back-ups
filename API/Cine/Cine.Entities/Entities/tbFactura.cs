﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class tbFactura
    {
        public tbFactura()
        {
            tbFacturaDetalles = new HashSet<tbFacturaDetalle>();
        }

        public int fact_Id { get; set; }
        public string fact_Nombres { get; set; }
        public string fact_Apellidos { get; set; }
        public string fact_RTN { get; set; }
        public bool? fact_Estado { get; set; }
        public int fact_UsuCrea { get; set; }
        public DateTime? fact_FechaCrea { get; set; }
        public int? fact_UsuMofica { get; set; }
        public DateTime? fact_FechaModifica { get; set; }

        public virtual ICollection<tbFacturaDetalle> tbFacturaDetalles { get; set; }
    }
}