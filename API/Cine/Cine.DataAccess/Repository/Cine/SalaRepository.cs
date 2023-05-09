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
    public class SalaRepository : IRepository<tbSala, VW_Sala>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sala_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbSalas_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_Sala Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sala_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_Sala>(ScriptsDataBase.UDP_tbSalas_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbSala item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@sala_Butacas", item.sala_Butacas, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sala_Tipo", item.sala_Tipo, DbType.String, ParameterDirection.Input);
            parametros.Add("@sala_Sucursal", item.sala_Sucursal, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sala_UserCrea", item.sala_UserCrea, DbType.Int32, ParameterDirection.Input);


            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbSalas_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_Sala> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Sala>(ScriptsDataBase.UDP_tbSalas_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbSala item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sala_Id", item.sala_Id, DbType.Int32, ParameterDirection.Input);

            parametros.Add("@sala_Butacas",     item.sala_Butacas, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sala_Tipo",        item.sala_Tipo, DbType.String, ParameterDirection.Input);
            parametros.Add("@sala_Sucursal",    item.sala_Sucursal, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sala_UserMofica",  item.sala_UserMofica, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbSalas_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
