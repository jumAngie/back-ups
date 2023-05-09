using System;
using Cine.Entities.Entities;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Text;
using Terminal.DataAccess.Repository;
using System.Data;

namespace Cine.DataAccess.Repository.Cine
{
    public class FacturaDetallesRepository : IRepository<tbFacturaDetalle, VW_tbFacturaDetalle>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@fade_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbFacturaDetalle_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_tbFacturaDetalle Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@fade_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbFacturaDetalle>(ScriptsDataBase.UDP_tbFacturaDetalle_FIND, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbFacturaDetalle item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@fade_Factura ",        item.fade_Factura,      DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@fade_Proyeccion",      item.fade_Proyeccion,   DbType.Int32,  ParameterDirection.Input);
            parametros.Add("@fade_ComboDetalle",    item.fade_ComboDetalle, DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@fade_UsuCrea",         item.fade_UsuCrea,      DbType.Int32, ParameterDirection.Input);


            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbFacturaDetalle_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_tbFacturaDetalle> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbFacturaDetalle>(ScriptsDataBase.UDP_tbFacturaDetalle_SELECT, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbFacturaDetalle item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@fade_Id",              item.fade_Id,           DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fade_Factura ",        item.fade_Factura,      DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fade_Proyeccion",      item.fade_Proyeccion,   DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fade_ComboDetalle",    item.fade_ComboDetalle, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fade_UsuMofica",       item.fade_UsuMofica,    DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbFacturaDetalle_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
