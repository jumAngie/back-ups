using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Cine.Entities.Entities;
using Dapper;
using Microsoft.Data.SqlClient;
using Terminal.DataAccess.Repository;

namespace Cine.DataAccess.Repository.Acce
{
    public class RolRepository : IRepository<tbRole, VW_tbRole>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbRol_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_tbRole Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbRole>(ScriptsDataBase.UDP_tbRol_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbRole item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@role_Nombre", item.role_Nombre,           DbType.String, ParameterDirection.Input);
            parametros.Add("@role_UsuCreacion", item.role_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbRol_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_tbRole> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbRole>(ScriptsDataBase.UDP_tbRol_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbRole item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id ", item.role_Id, DbType.Int32, ParameterDirection.Input);

            parametros.Add("@role_Nombre", item.role_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@role_UsuModificacion", item.role_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbRol_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
