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
            throw new NotImplementedException();
        }

        public VW_tbInsumo Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbInsumo item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbInsumo> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbInsumo>(ScriptsDataBase.UPD_tbInsumo_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbInsumo item)
        {
            throw new NotImplementedException();
        }
    }
}
