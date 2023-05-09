using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using Microsoft.Data.SqlClient;
using Cine.Entities.Entities;
using Terminal.DataAccess.Repository;
using System.Data;

namespace Cine.DataAccess.Repository.Cine
{
    public class FacturasRepository : IRepository<tbFactura, VW_tbFactura>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@fact_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbFactura_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_tbFactura Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@fact_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbFactura>(ScriptsDataBase.UDP_tbFactura_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbFactura item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@fact_Nombres ",    item.fact_Nombres,      DbType.String,  ParameterDirection.Input);
            parametros.Add("@fact_Apellidos",   item.fact_Apellidos,    DbType.String,  ParameterDirection.Input);
            parametros.Add("@fact_RTN",         item.fact_RTN,          DbType.String,  ParameterDirection.Input);
            parametros.Add("@fact_UsuCrea",     item.fact_UsuCrea,      DbType.Int32,   ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbFactura_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_tbFactura> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbFactura>(ScriptsDataBase.UDP_tbFactura_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbFactura item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@fact_Id ",         item.fact_Id,           DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@fact_Nombres ",    item.fact_Nombres,      DbType.String,  ParameterDirection.Input);
            parametros.Add("@fact_Apellidos",   item.fact_Apellidos,    DbType.String,  ParameterDirection.Input);
            parametros.Add("@fact_RTN",         item.fact_RTN,          DbType.String,  ParameterDirection.Input);
            parametros.Add("@fact_UsuMofica",   item.fact_UsuMofica,    DbType.Int32,   ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbFactura_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
