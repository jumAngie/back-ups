﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class tbCategoriaSala
    {
        public tbCategoriaSala()
        {
            tbSalas = new HashSet<tbSala>();
        }

        public int casa_Id { get; set; }
        public string casa_Categoria { get; set; }
        public int? casa_Precio { get; set; }

        public virtual ICollection<tbSala> tbSalas { get; set; }
    }
}