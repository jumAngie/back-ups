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

        public RequestStatus Insert2(tbFacturaDetalles item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@fade_Factura ",        item.fade_Factura,          DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@fade_Proyeccion",      item.fade_Proyeccion,       DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@fade_Tickets",         item.fade_Tickets,          DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@fade_ContenidoCombo",  item.fade_ContenidoCombo,   DbType.String,   ParameterDirection.Input);
            parametros.Add("@fade_ContenidoInsumo", item.fade_ContenidoInsumo,   DbType.String,   ParameterDirection.Input);
            parametros.Add("@fade_Pago",            item.fade_Pago,             DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@fade_Total",           item.fade_Total,            DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@fade_UsuCrea",         item.fade_UsuCrea,          DbType.Int32,   ParameterDirection.Input);


            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbFacturaDetalle_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_tbFacturaDetalle> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbFacturaDetalle>(ScriptsDataBase.UDP_tbFacturaDetalle_SELECT, null, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<VW_tbFacturaDetalle1> ListFinal(string clie_RTN , int fade_Factura)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@clie_RTN", clie_RTN, DbType.String, ParameterDirection.Input);
            parametros.Add("@fade_Factura", fade_Factura, DbType.Int32, ParameterDirection.Input);
            return db.Query<VW_tbFacturaDetalle1>(ScriptsDataBase.UDP_tbFacturaDetalleFinal_SELECT, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbFacturaDetalle item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

           

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbFacturaDetalle_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }


        public RequestStatus InsertTickey(tbTicket item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@tick_Factura ", item.tick_Factura, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tick_Proyeccion", item.tick_Proyeccion, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tick_Asiento", item.tick_Asiento, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tick_UsuCrea", item.tick_UsuCrea, DbType.Int32, ParameterDirection.Input);



            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbTickets_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbFacturaDetalle item)
        {
            throw new NotImplementedException();
        }
    }
}
