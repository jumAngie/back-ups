using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using Microsoft.Data.SqlClient;
using Cine.Entities.Entities;
using Terminal.DataAccess.Repository;
using System.Data;

namespace Cine.DataAccess.Repository.Gral
{
    public class ClientesRepository : IRepository<tbCliente, VW_Cliente>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@clie_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbClientes_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_Cliente Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@clie_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_Cliente>(ScriptsDataBase.UDP_tbCategorias_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbCliente item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@clie_Nombres",     item.clie_Nombres,      DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_Apellidos",   item.clie_Apellidos,    DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_RTN",         item.clie_RTN,          DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_UserCrea",    item.clie_UserCrea,     DbType.Int32,  ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbClientes_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_Cliente> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Cliente>(ScriptsDataBase.UDP_tbClientes_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbCliente item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@clie_Id",              item.clie_Id,           DbType.Int32,  ParameterDirection.Input);

            parametros.Add("@clie_Nombres",         item.clie_Nombres,      DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_Apellidos",       item.clie_Apellidos,    DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_RTN",             item.clie_RTN,          DbType.String, ParameterDirection.Input);
            parametros.Add("@clie_UserModifica",    item.clie_UserModifica, DbType.Int32,  ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbClientes_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
