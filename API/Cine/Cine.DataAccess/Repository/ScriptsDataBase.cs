using System;
using System.Collections.Generic;
using System.Text;

namespace Terminal.DataAccess.Repository
{
    public class ScriptsDataBase // Procedimientos almacenados
    {

        // // n u e v o  //

        #region Peliculas
        public static string UPD_tbPeliculas_SELECT = "cine.UDP_tbPeliculas_SELECT";
        public static string UDP_tbPeliculas_INSERT = "cine.UDP_tbPeliculas_INSERT";
        public static string UDP_tbPeliculas_FIND =     "cine.UDP_tbPeliculas_FIND";
        public static string UDP_tbPeliculas_UPDATE = "cine.UDP_tbPeliculas_UPDATE";
        public static string UDP_tbPeliculas_DELETE = "cine.UDP_tbPeliculas_DELETE";
        #endregion

        #region Combos
        public static string UDP_tbCombos_SELECT = "cine.UDP_tbCombos_SELECT";
        public static string UDP_tbCombos_INSERT = "cine.UDP_tbCombos_INSERT";
        public static string UDP_tbCombos_FIND = "cine.UDP_tbCombos_FIND";
        public static string UDP_tbCombos_UPDATE = "cine.UDP_tbCombos_UPDATE";
        public static string UDP_tbCombos_DELETE = "cine.UDP_tbCombos_DELETE";
        #endregion

        // 07 05 23

        #region ComboDetalles
        public static string UDP_tbCombosDetalles_SELECT = "cine.UDP_tbComboDetalles_SELECT";
        public static string UDP_tbCombosDetalles_INSERT = "cine.UDP_tbComboDetalles_INSERT";
        public static string UDP_tbCombosDetalles_FIND = "cine.UDP_tbComboDetalles_FIND";
        public static string UDP_tbCombosDetalles_UPDATE = "cine.UDP_tbComboDetalles_UPDATE";
        public static string UDP_tbCombosDetalles_DELETE = "cine.UDP_tbComboDetalles_DELETE";
        #endregion

        #region Categorias
        public static string UDP_tbCategorias_SELECT = "gral.UDP_tbCategorias_SELECT";
        public static string UDP_tbCategorias_INSERT = "gral.UDP_tbCategoria_Insert";
        public static string UDP_tbCategorias_FIND = "gral.UDP_tbCategoria_FIND";
        public static string UDP_tbCategorias_UPDATE = "gral.UDP_tbCategoria_UPDATE";
        public static string UDP_tbCategorias_DELETE = "gral.UDP_tbCategoria_Delete";
        #endregion

        #region Metodo de Pago
        public static string UDP_tbMetodoPago_SELECT = "gral.UDP_tbMetodoPago_SELECT";
        public static string UDP_tbMetodoPago_INSERT = "gral.UDP_tbMetodoPago_Insert";
        public static string UDP_tbMetodoPago_FIND = "gral.UDP_tbMetodoPago_FIND";
        public static string UDP_tbMetodoPago_UPDATE = "gral.UDP_tbMetodoPago_UPDATE";
        public static string UDP_tbMetodoPago_DELETE = "gral.UDP_tbMetodoPago_Delete";
        #endregion

        #region Clientes
        public static string UDP_tbClientes_SELECT = "gral.UDP_tbClientes_SELECT";
        public static string UDP_tbClientes_INSERT = "gral.UDP_tbClientes_Insert";
        public static string UDP_tbClientes_FIND = "gral.UDP_tbClientes_FIND";
        public static string UDP_tbClientes_UPDATE = "gral.UDP_tbClientes_UPDATE";
        public static string UDP_tbClientes_DELETE = "gral.UDP_tbClientes_Delete";
        #endregion

        #region Pantallas
        public static string UDP_tbPantallas_SELECT = "acce.UDP_tbPantallas_SELECT";
        public static string UDP_tbPantallas_NoAsociadasARol_LIST = "acce.UDP_tbRolesPantalla_PantallasNoAsociadasAlRol";
        #endregion

        #region Sala
        public static string UDP_tbSalas_SELECT = "cine.UDP_tbSalas_SELECT";
        public static string UDP_tbSalas_INSERT = "cine.UDP_tbSalas_Insert";
        public static string UDP_tbSalas_FIND = "cine.UDP_tbSalas_FIND";
        public static string UDP_tbSalas_UPDATE = "cine.UDP_tbSalas_UPDATE";
        public static string UDP_tbSalas_DELETE = "cine.UDP_tbSalas_Delete";
        #endregion

        #region Facturas
        public static string UDP_tbFactura_SELECT = "cine.UDP_tbFactura_SELECT";
        public static string UDP_tbFactura_INSERT = "cine.UDP_tbFactura_INSERT";
        public static string UDP_tbFactura_FIND = "cine.UDP_tbFactura_FIND";
        public static string UDP_tbFactura_UPDATE = "cine.UDP_tbFactura_UPDATE";
        public static string UDP_tbFactura_DELETE = "cine.UDP_tbFactura_DELETE";
        #endregion

        #region Factura Detalles
        public static string UDP_tbFacturaDetalle_SELECT = "cine.UDP_tbFacturaDetalle_SELECT";
        public static string UDP_tbFacturaDetalleFinal_SELECT = "cine.UDP_tbFacturaDetalleFinal_SELECT";
        public static string UDP_tbFacturaDetalle_INSERT = "cine.UDP_tbFacturaDetalle_INSERT";
        public static string UDP_tbTickets_INSERT = "cine.UDP_tbTickets_INSERT";
        public static string UDP_tbFacturaDetalle_FIND = "cine.UDP_tbFacturaDetalle_FIND";
        public static string UDP_tbFacturaDetalle_UPDATE = "cine.UDP_tbFacturaDetalle_UPDATE";
        public static string UDP_tbFacturaDetalle_DELETE = "cine.UDP_tbFacturaDetalle_DELETE";
        #endregion

        #region Rol
        public static string UDP_tbRol_SELECT = "acce.UDP_tbRoles_SELECT";
        public static string UDP_tbRol_INSERT = "acce.UDP_tbROL_INSERT";
        public static string UDP_tbRol_FIND = "acce.UDP_tbRoles_FIND";
        public static string UDP_tbRol_UPDATE = "acce.UDP_tbROL_UPDATE";
        public static string UDP_tbRol_DELETE = "acce.UDP_tbROL_DELETE";
        #endregion

        #region Rol por Pantalla
        public static string UDP_tbRolPantallas_SELECT = "acce.UDP_tbRolPantallas_SELECT";
        public static string UDP_tbRolPantallas_INSERT = "acce.UDP_tbRolPantallas_Insert";
        public static string UDP_tbRolPantallas_FIND = "acce.UDP_tbRolPantallas_FIND";
        public static string UDP_tbRolPantallas_UPDATE = "acce.UDP_tbRolPantallas_UPDATE";
        public static string UDP_tbRolPantallas_DELETE = "acce.UDP_tbRolPantallas_Delete";
        public static string UDP_PantallasPorRol = "acce.UDP_PantallasPorRol";
        public static string UDP_DibujadoMenu = "acce.UDP_Menu_PantallasPorRol";
        public static string UDP_BorrarRolPorPantalla = "acce.UDP_tbRolesPantallas_EliminarRolDePantalla";
        #endregion

        // // n u e v o //

        #region Municipio
        public static string UDP_tbMunicipio_DDL = "gral.UDP_tbMunicipio_DDL ";

        #endregion

        #region Departamento
        public static string UDP_Prueba_Departamento =  "UDP_Prueba_Departamento";
        public static string UDP_Departamento_Insert =  "UDP_Departamento_Insert";
        public static string UDP_Departamento_Find =    "UDP_Departamento_Find";
        public static string UDP_Departamento_Update =  "UDP_Departamento_Update";
        public static string UDP_Departamento_Delete =  "UDP_Departamento_Delete";
        #endregion

        #region Empleados
        public static string UDP_tbEmpleados_Select = "gral.UDP_tbEmpleados_Select";
        public static string UDP_tbEmpleado_Insert = "gral.UDP_tbEmpleado_Insert";
        public static string UDP_tbEmpleados_FIND = "gral.UDP_tbEmpleados_FIND";
        public static string UDP_tbEmpleados_UPDATE = "gral.UDP_tbEmpleados_UPDATE";
        public static string UDP_tbEmpleados_Delete = "gral.UDP_tbEmpleados_Delete";
        public static string UDP_tbEmpleadosSinUsuario = "acce.UDP_tbEmpleadosSinUsuarios";
        public static string UDP_tbEmpleadosSinUsuario_Edit = "acce.UDP_tbEmpleadoSinUsuario_Editar";
        #endregion

        #region Director
        public static string UDP_tbDirector_SELECT = "cine.UDP_tbDirector_SELECT";
        public static string UDP_tbDirectores_INSERT = "cine.UDP_tbDirectores_INSERT";
        public static string UDP_tbDirector_FIND = "cine.UDP_tbDirector_FIND";
        public static string UDP_tbDirectores_UPDATE = "cine.UDP_tbDirectores_UPDATE";
        public static string UDP_tbDirectores_DELETE = "cine.UDP_tbDirectores_DELETE";

        #endregion

        #region Insumo
        public static string UPD_tbInsumo_SELECT = "cine.UPD_tbInsumo_SELECT ";
        public static string UDP_tbInsumos_INSERT = "cine.UDP_tbInsumos_INSERT ";
        public static string UPD_tbInsumo_FIND = "cine.UPD_tbInsumo_FIND ";
        public static string UDP_tbInsumo_UPDATE = "cine.UDP_tbInsumo_UPDATE ";
        public static string UDP_Insumo_DELETE = "cine.UDP_Insumo_DELETE ";

        #endregion

        #region Sucursal
        public static string UDP_tbSucursale_SELECT = "cine.UDP_tbSucursale_SELECT";
        public static string UDP_tbSucursale_INSERT = "cine.UDP_tbSucursale_INSERT";
        public static string UDP_tbSucursale_FIND = "cine.UDP_tbSucursale_FIND";
        public static string UDP_tbSucursale_UPDATE = "cine.UDP_tbSucursale_UPDATE";
        public static string UDP_tbSucursale_DELETE = "cine.UDP_tbSucursale_DELETE";

        #endregion

        #region Usuario
        public static string UDP_tbUsuario_Select = "acce.UDP_tbUsuario_Select";
        public static string UDP_ValidarLogIN = "acce.UDP_ValidarLogIN";
        public static string UDP_tbUsuario_FIND = "acce.UDP_tbUsuario_FIND";
        public static string UDP_tbUsuario_INSERT = "acce.UDP_tbUsuario_INSERT";
        public static string UDP_tbUsuario_UPDATE = "acce.UDP_tbUsuario_UPDATE";
        public static string UDP_tbUsuario_DELETE = "acce.UDP_tbUsuario_DELETE";
        //public static string UDP_tbSucursale_INSERT = "cine.UDP_tbSucursale_INSERT";
        //public static string UDP_tbSucursale_FIND = "cine.UDP_tbSucursale_FIND";
        //public static string UDP_tbSucursale_UPDATE = "cine.UDP_tbSucursale_UPDATE";
        //public static string UDP_tbSucursale_DELETE = "cine.UDP_tbSucursale_DELETE";

        #endregion

        #region Cargo
        public static string UDP_tbCargo_SELECT = "gral.UDP_tbCargo_SELECT";


        #endregion

        #region Estado Civil
        public static string UDP_tbEstadoCivil_SELECT = "gral.UDP_tbEstadoCivil_SELECT";


        #endregion

        #region Proyecciones
        public static string UDP_tbProyecciones_SELECT = "cine.UDP_tbProyecciones_SELECT";
        public static string UDP_tbAsientos_SELECT = "cine.UDP_tbAsientos_SELECT ";
        public static string UDP_tbProyecciones_FIND = "cine.UDP_tbProyecciones_FIND";
        public static string UDP_tbProyecciones_INSERT = "cine.UDP_tbProyecciones_INSERT";
        public static string UDP_tbProyecciones_UPDATE = "cine.UDP_tbProyecciones_UPDATE";
        public static string UDP_tbProyecciones_DELETE = "cine.UDP_tbProyecciones_DELETE";
        public static string UDP_tbHorario_SELECT = "cine.UDP_tbHorario_SELECT";
        #endregion


    }
}
