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
    public class SucursalesRepository : IRepository<tbSucursale, VW_tbSUCURSAL>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbSUCURSAL Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbSucursale item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbSUCURSAL> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbSUCURSAL>(ScriptsDataBase.UDP_tbSucursale_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbSucursale item)
        {
            throw new NotImplementedException();
        }
    }
}
