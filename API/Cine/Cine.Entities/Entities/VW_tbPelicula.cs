﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class VW_tbPelicula
    {
        public int peli_Id { get; set; }
        public string peli_Titulo { get; set; }
        public string peli_TitulOriginal { get; set; }
        public int peli_AnioEstreno { get; set; }
        public int peli_Duracion { get; set; }
        public int peli_Categoria { get; set; }
        public string cate_Nombre { get; set; }
        public int peli_Director { get; set; }
        public string Dire_Nombre { get; set; }
        public bool? peli_Estado { get; set; }
        public int peli_UsuCrea { get; set; }
        public int user_Empleado { get; set; }
        public string Nombre { get; set; }
        public DateTime? peli_FechaCrea { get; set; }
        public int? peli_UsuMofica { get; set; }
        public DateTime? peli_FechaModifica { get; set; }
    }
}