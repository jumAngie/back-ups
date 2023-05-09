﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Cine.Entities.Entities
{
    public partial class tbUsuario
    {
        public tbUsuario()
        {
            Inverseuser_UsuarioCreaNavigation = new HashSet<tbUsuario>();
            Inverseuser_UsuarioModificaNavigation = new HashSet<tbUsuario>();
            tbAsientoasie_UserCreaNavigations = new HashSet<tbAsiento>();
            tbAsientoasie_UserMoficaNavigations = new HashSet<tbAsiento>();
            tbCargocarg_UsuarioCreadorNavigations = new HashSet<tbCargo>();
            tbCargocarg_UsuarioModificadoNavigations = new HashSet<tbCargo>();
            tbCategoriacate_UsuarioCreadorNavigations = new HashSet<tbCategoria>();
            tbCategoriacate_UsuarioModificadorNavigations = new HashSet<tbCategoria>();
            tbClienteclie_UserCreaNavigations = new HashSet<tbCliente>();
            tbClienteclie_UserModificaNavigations = new HashSet<tbCliente>();
            tbComboDetallecdet_UserCreaNavigations = new HashSet<tbComboDetalle>();
            tbComboDetallecdet_UserMoficaNavigations = new HashSet<tbComboDetalle>();
            tbCombocomb_UserCreaNavigations = new HashSet<tbCombo>();
            tbCombocomb_UsuarioModificaNavigations = new HashSet<tbCombo>();
            tbDepartamentodept_UserCreaNavigations = new HashSet<tbDepartamento>();
            tbDepartamentodept_UserMoficaNavigations = new HashSet<tbDepartamento>();
            tbDirectoredire_UsuCreaNavigations = new HashSet<tbDirectore>();
            tbDirectoredire_UsuMoficaNavigations = new HashSet<tbDirectore>();
            tbEmpleadoempl_UsuarioCreadorNavigations = new HashSet<tbEmpleado>();
            tbEmpleadoempl_UsuarioModificadoNavigations = new HashSet<tbEmpleado>();
            tbEstadosCivileestc_UserCreaNavigations = new HashSet<tbEstadosCivile>();
            tbEstadosCivileestc_UserMoficaNavigations = new HashSet<tbEstadosCivile>();
            tbInsumoinsu_UserCreaNavigations = new HashSet<tbInsumo>();
            tbInsumoinsu_UsuarioModificaNavigations = new HashSet<tbInsumo>();
            tbMetodosPagopago_UsuarioCreadorNavigations = new HashSet<tbMetodosPago>();
            tbMetodosPagopago_UsuarioModificadorNavigations = new HashSet<tbMetodosPago>();
            tbMunicipiomuni_UserCreaNavigations = new HashSet<tbMunicipio>();
            tbMunicipiomuni_UserMoficaNavigations = new HashSet<tbMunicipio>();
            tbPeliculapeli_UsuCreaNavigations = new HashSet<tbPelicula>();
            tbPeliculapeli_UsuMoficaNavigations = new HashSet<tbPelicula>();
            tbRolerole_UsuCreacionNavigations = new HashSet<tbRole>();
            tbRolerole_UsuModificacionNavigations = new HashSet<tbRole>();
            tbRolesPantallaropa_UserCreaNavigations = new HashSet<tbRolesPantalla>();
            tbRolesPantallaropa_UserMoficaNavigations = new HashSet<tbRolesPantalla>();
            tbSalasala_UserCreaNavigations = new HashSet<tbSala>();
            tbSalasala_UserMoficaNavigations = new HashSet<tbSala>();
            tbSucursalesucu_UserCreaNavigations = new HashSet<tbSucursale>();
            tbSucursalesucu_UsuarioModificaNavigations = new HashSet<tbSucursale>();
        }

        public int user_Id { get; set; }
        public string user_NombreUsuario { get; set; }
        public string user_Contrasenia { get; set; }
        public int user_Empleado { get; set; }
        public int user_Rol { get; set; }
        public bool user_EsAdmin { get; set; }
        public bool? user_Estado { get; set; }
        public int user_UsuarioCrea { get; set; }
        public DateTime user_FechaCrea { get; set; }
        public int? user_UsuarioModifica { get; set; }
        public DateTime? user_FechaModifica { get; set; }

        public virtual tbEmpleado user_EmpleadoNavigation { get; set; }
        public virtual tbRole user_RolNavigation { get; set; }
        public virtual tbUsuario user_UsuarioCreaNavigation { get; set; }
        public virtual tbUsuario user_UsuarioModificaNavigation { get; set; }
        public virtual ICollection<tbUsuario> Inverseuser_UsuarioCreaNavigation { get; set; }
        public virtual ICollection<tbUsuario> Inverseuser_UsuarioModificaNavigation { get; set; }
        public virtual ICollection<tbAsiento> tbAsientoasie_UserCreaNavigations { get; set; }
        public virtual ICollection<tbAsiento> tbAsientoasie_UserMoficaNavigations { get; set; }
        public virtual ICollection<tbCargo> tbCargocarg_UsuarioCreadorNavigations { get; set; }
        public virtual ICollection<tbCargo> tbCargocarg_UsuarioModificadoNavigations { get; set; }
        public virtual ICollection<tbCategoria> tbCategoriacate_UsuarioCreadorNavigations { get; set; }
        public virtual ICollection<tbCategoria> tbCategoriacate_UsuarioModificadorNavigations { get; set; }
        public virtual ICollection<tbCliente> tbClienteclie_UserCreaNavigations { get; set; }
        public virtual ICollection<tbCliente> tbClienteclie_UserModificaNavigations { get; set; }
        public virtual ICollection<tbComboDetalle> tbComboDetallecdet_UserCreaNavigations { get; set; }
        public virtual ICollection<tbComboDetalle> tbComboDetallecdet_UserMoficaNavigations { get; set; }
        public virtual ICollection<tbCombo> tbCombocomb_UserCreaNavigations { get; set; }
        public virtual ICollection<tbCombo> tbCombocomb_UsuarioModificaNavigations { get; set; }
        public virtual ICollection<tbDepartamento> tbDepartamentodept_UserCreaNavigations { get; set; }
        public virtual ICollection<tbDepartamento> tbDepartamentodept_UserMoficaNavigations { get; set; }
        public virtual ICollection<tbDirectore> tbDirectoredire_UsuCreaNavigations { get; set; }
        public virtual ICollection<tbDirectore> tbDirectoredire_UsuMoficaNavigations { get; set; }
        public virtual ICollection<tbEmpleado> tbEmpleadoempl_UsuarioCreadorNavigations { get; set; }
        public virtual ICollection<tbEmpleado> tbEmpleadoempl_UsuarioModificadoNavigations { get; set; }
        public virtual ICollection<tbEstadosCivile> tbEstadosCivileestc_UserCreaNavigations { get; set; }
        public virtual ICollection<tbEstadosCivile> tbEstadosCivileestc_UserMoficaNavigations { get; set; }
        public virtual ICollection<tbInsumo> tbInsumoinsu_UserCreaNavigations { get; set; }
        public virtual ICollection<tbInsumo> tbInsumoinsu_UsuarioModificaNavigations { get; set; }
        public virtual ICollection<tbMetodosPago> tbMetodosPagopago_UsuarioCreadorNavigations { get; set; }
        public virtual ICollection<tbMetodosPago> tbMetodosPagopago_UsuarioModificadorNavigations { get; set; }
        public virtual ICollection<tbMunicipio> tbMunicipiomuni_UserCreaNavigations { get; set; }
        public virtual ICollection<tbMunicipio> tbMunicipiomuni_UserMoficaNavigations { get; set; }
        public virtual ICollection<tbPelicula> tbPeliculapeli_UsuCreaNavigations { get; set; }
        public virtual ICollection<tbPelicula> tbPeliculapeli_UsuMoficaNavigations { get; set; }
        public virtual ICollection<tbRole> tbRolerole_UsuCreacionNavigations { get; set; }
        public virtual ICollection<tbRole> tbRolerole_UsuModificacionNavigations { get; set; }
        public virtual ICollection<tbRolesPantalla> tbRolesPantallaropa_UserCreaNavigations { get; set; }
        public virtual ICollection<tbRolesPantalla> tbRolesPantallaropa_UserMoficaNavigations { get; set; }
        public virtual ICollection<tbSala> tbSalasala_UserCreaNavigations { get; set; }
        public virtual ICollection<tbSala> tbSalasala_UserMoficaNavigations { get; set; }
        public virtual ICollection<tbSucursale> tbSucursalesucu_UserCreaNavigations { get; set; }
        public virtual ICollection<tbSucursale> tbSucursalesucu_UsuarioModificaNavigations { get; set; }
    }
}