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
    public class SucursalesRepository : IRepository<tbSucursale, VW_tbSUCURSAL>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbSucursale_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_tbSUCURSAL Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbSUCURSAL>(ScriptsDataBase.UDP_tbSucursale_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbSucursale item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_Nombre", item.sucu_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Direccion", item.sucu_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Ciudad", item.sucu_Ciudad, DbType.Int64, ParameterDirection.Input);
             parametros.Add("@sucu_UserCrea", item.sucu_UserCrea, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbSucursale_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_tbSUCURSAL> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbSUCURSAL>(ScriptsDataBase.UDP_tbSucursale_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbSucursale item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sucu_Nombre", item.sucu_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Direccion", item.sucu_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Ciudad", item.sucu_Ciudad, DbType.Int64, ParameterDirection.Input);
            parametros.Add("@sucu_UsuarioModifica", item.sucu_UserCrea, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbSucursale_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
