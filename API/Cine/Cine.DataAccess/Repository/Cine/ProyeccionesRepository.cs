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
    public class ProyeccionesRepository : IRepository<tbProyeccione, VW_Proyeccione>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_Proyeccione Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbProyeccione item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_Proyeccione> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Proyeccione>(ScriptsDataBase.UDP_tbProyecciones_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbProyeccione item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbAsiento> ListAsientos(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@asie_Sala", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<tbAsiento>(ScriptsDataBase.UDP_tbAsientos_SELECT, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
