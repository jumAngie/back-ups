﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class tbProyeccione
    {
        public tbProyeccione()
        {
            tbFacturaDetalles = new HashSet<tbFacturaDetalle>();
            tbTickets = new HashSet<tbTicket>();
        }

        public int proy_Id { get; set; }
        public int? proy_Pelicula { get; set; }
        public int? proy_Sala { get; set; }
        public int? proy_Horario { get; set; }
        public bool? proy_Estado { get; set; }

        public virtual tbHorario proy_HorarioNavigation { get; set; }
        public virtual tbPelicula proy_PeliculaNavigation { get; set; }
        public virtual tbSala proy_SalaNavigation { get; set; }
        public virtual ICollection<tbFacturaDetalle> tbFacturaDetalles { get; set; }
        public virtual ICollection<tbTicket> tbTickets { get; set; }
    }
}