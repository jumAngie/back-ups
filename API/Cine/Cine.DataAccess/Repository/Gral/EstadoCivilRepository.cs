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
    public class EstadoCivilRepository : IRepository<tbEstadosCivile, VW_EstadoCivil>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_EstadoCivil Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEstadosCivile item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_EstadoCivil> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_EstadoCivil>(ScriptsDataBase.UDP_tbEstadoCivil_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbEstadosCivile item)
        {
            throw new NotImplementedException();
        }
    }
}
