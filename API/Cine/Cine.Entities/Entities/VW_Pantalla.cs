﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class VW_Pantalla
    {
        public int panta_Id { get; set; }
        public string panta_Descripcion { get; set; }
        public string panta_to { get; set; }

        public string icon { get; set; }
        public string panta_label { get; set; }
        public string panta_Menu { get; set; }
        public bool? panta_Estado { get; set; }
        public int panta_UserCrea { get; set; }
        public DateTime? panta_FechaCrea { get; set; }
        public int? panta_UserMofica { get; set; }
        public DateTime? panta_FechaModifica { get; set; }
    }
}