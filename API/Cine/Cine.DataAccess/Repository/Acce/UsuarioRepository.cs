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
    public class UsuarioRepository : IRepository<tbUsuario, VW_Usuario>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@user_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbUsuario_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_Usuario Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@user_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_Usuario>(ScriptsDataBase.UDP_tbUsuario_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbUsuario item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@user_NombreUsuario", item.user_NombreUsuario, DbType.String, ParameterDirection.Input);
            parametros.Add("@user_Contrasenia", item.user_Contrasenia, DbType.String, ParameterDirection.Input);
            parametros.Add("@user_Empleado", item.user_Empleado, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@user_Rol", item.user_Rol, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@user_EsAdmin", item.user_EsAdmin, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@user_UsuarioCrea", item.user_UsuarioCrea, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbUsuario_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }


        public VW_Usuario UserValid(tbUsuario item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@correoElectronico", item.user_NombreUsuario, DbType.String, ParameterDirection.Input);
            parametros.Add("@contrasenia", item.user_Contrasenia, DbType.String, ParameterDirection.Input);

            return db.QueryFirst<VW_Usuario>(ScriptsDataBase.UDP_ValidarLogIN, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_Usuario> List()
        {   
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Usuario>(ScriptsDataBase.UDP_tbUsuario_Select, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbUsuario item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@user_Id", item.user_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@user_NombreUsuario", item.user_NombreUsuario, DbType.String, ParameterDirection.Input);
            parametros.Add("@user_Empleado", item.user_Empleado, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@user_Rol", item.user_Rol, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@user_EsAdmin", item.user_EsAdmin, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@user_UsuarioModifica", item.user_UsuarioModifica, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbUsuario_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
