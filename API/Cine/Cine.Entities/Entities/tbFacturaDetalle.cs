﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class tbFacturaDetalle
    {
        public int fade_Id { get; set; }
        public int? fade_Factura { get; set; }
        public int? fade_Proyeccion { get; set; }
        public int? fade_Tickets { get; set; }
        public string fade_ContenidoCombo { get; set; }
        public string fade_ContenidoInsumo { get; set; }
        public int? fade_Pago { get; set; }
        public int? fade_Total { get; set; }
        public bool? fade_Estado { get; set; }
        public int fade_UsuCrea { get; set; }
        public DateTime? fade_FechaCrea { get; set; }
        public int? fade_UsuMofica { get; set; }
        public DateTime? fade_FechaModifica { get; set; }

        public virtual tbFactura fade_FacturaNavigation { get; set; }
        public virtual tbMetodosPago fade_PagoNavigation { get; set; }
        public virtual tbProyeccione fade_ProyeccionNavigation { get; set; }
    }
}