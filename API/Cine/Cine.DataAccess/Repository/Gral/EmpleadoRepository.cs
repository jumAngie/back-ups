using Cine.Entities.Entities;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Terminal.DataAccess.Repository;

namespace Cine.DataAccess.Repository
{
    public class EmpleadoRepository : IRepository<tbEmpleado, VW_tbEmpleado>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@empl_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbEmpleados_Delete, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_tbEmpleado Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@empl_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbEmpleado>(ScriptsDataBase.UDP_tbEmpleados_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbEmpleado item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@empl_DNI", item.empl_DNI, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Nombre", item.empl_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Apellidos", item.empl_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Sexo", item.empl_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Estadocivil", item.empl_Estadocivil, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_Muni", item.empl_Muni, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_Cargo", item.empl_Cargo, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_Sucursal", item.empl_Sucursal, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_DireccionExacta", item.empl_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_FechaNacimiento", item.empl_FechaNacimiento, DbType.DateTime, ParameterDirection.Input);
            parametros.Add("@empl_Telefono", item.empl_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_UsuarioCreador", item.empl_UsuarioCreador, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbEmpleado_Insert, parametros, commandType: CommandType.StoredProcedure);

        }



        public IEnumerable<VW_tbEmpleado> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbEmpleado>(ScriptsDataBase.UDP_tbEmpleados_Select, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbEmpleado item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@empl_Id", item.empl_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_DNI", item.empl_DNI, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Nombre", item.empl_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Apellidos", item.empl_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Sexo", item.empl_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Estadocivil", item.empl_Estadocivil, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_Muni", item.empl_Muni, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_Cargo", item.empl_Cargo, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_Sucursal", item.empl_Sucursal, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_DireccionExacta", item.empl_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_FechaNacimiento", item.empl_FechaNacimiento, DbType.DateTime, ParameterDirection.Input);
            parametros.Add("@empl_Telefono", item.empl_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_UsuarioModificador", item.empl_UsuarioModificado, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbEmpleados_UPDATE, parametros, commandType: CommandType.StoredProcedure);
        }
    }
}
