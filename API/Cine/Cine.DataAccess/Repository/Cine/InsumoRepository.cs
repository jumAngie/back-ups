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
    public class InsumoRepository : IRepository<tbInsumo, VW_tbInsumo>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@insu_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_Insumo_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_tbInsumo Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@insu_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbInsumo>(ScriptsDataBase.UPD_tbInsumo_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbInsumo item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@insu_Descripcion ", item.insu_Descripcion, DbType.String,  ParameterDirection.Input);
            parametros.Add("@insu_Precio",       item.insu_Precio, DbType.Int32,        ParameterDirection.Input);
            parametros.Add("@insu_UserCrea",     item.insu_UserCrea, DbType.Int32,      ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbInsumos_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_tbInsumo> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbInsumo>(ScriptsDataBase.UPD_tbInsumo_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbInsumo item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@insu_Id", item.insu_Id, DbType.Int32, ParameterDirection.Input);

            parametros.Add("@insu_Descripcion",    item.insu_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@insu_Precio",          item.insu_Precio, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@insu_UsuarioModifica", item.insu_UsuarioModifica, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbInsumo_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
