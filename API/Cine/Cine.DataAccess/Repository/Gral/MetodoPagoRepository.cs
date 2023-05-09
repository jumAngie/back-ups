using System;
using System.Collections.Generic;
using System.Text;
using Cine.Entities.Entities;
using Terminal.DataAccess.Repository;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Cine.DataAccess.Repository.Gral
{
    public class MetodoPagoRepository : IRepository<tbMetodosPago, VW_MetodoPago>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pago_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbMetodoPago_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_MetodoPago Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pago_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_MetodoPago>(ScriptsDataBase.UDP_tbMetodoPago_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbMetodosPago item)
        {

            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@pago_Descripcion", item.pago_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@pago_UsuarioCreador", item.pago_UsuarioCreador, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbMetodoPago_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_MetodoPago> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_MetodoPago>(ScriptsDataBase.UDP_tbMetodoPago_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbMetodosPago item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pago_Id", item.pago_Id, DbType.Int32, ParameterDirection.Input);


            parametros.Add("@pago_Descripcion", item.pago_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@pago_UsuarioModificador", item.pago_UsuarioModificador, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbMetodoPago_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
