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
    public class CargoRepository : IRepository<tbCargo, VW_Cargo>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_Cargo Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbCargo item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_Cargo> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Cargo>(ScriptsDataBase.UDP_tbCargo_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbCargo item)
        {
            throw new NotImplementedException();
        }
    }
}
