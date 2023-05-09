using Cine.Entities.Entities;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Terminal.DataAccess.Repository;

namespace Cine.DataAccess.Repository.Cine
{
    public class ComboDetallesRepository : IRepository<tbComboDetalle, VW_tbComboDetalle>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cdet_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbCombosDetalles_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_tbComboDetalle Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cdet_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbComboDetalle>(ScriptsDataBase.UDP_tbCombosDetalles_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbComboDetalle item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cdet_combId",          item.cdet_combId,   DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cdet_insuId",          item.cdet_insuId,   DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cdet_UserCrea",        item.cdet_UserCrea, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbCombosDetalles_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_tbComboDetalle> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbComboDetalle>(ScriptsDataBase.UDP_tbCombosDetalles_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbComboDetalle item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cdet_Id",          item.cdet_Id,           DbType.Int32, ParameterDirection.Input);

            parametros.Add("@cdet_combId",      item.cdet_combId,       DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cdet_insuId",      item.cdet_insuId,       DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cdet_UserMofica",  item.cdet_UserMofica,   DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbCombosDetalles_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
