using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Cine.Entities.Entities;
using Dapper;
using Microsoft.Data.SqlClient;
using Terminal.DataAccess.Repository;

namespace Cine.DataAccess.Repository.Acce
{
    public class PantallasRepository : IRepository<tbPantalla, VW_Pantalla>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_Pantalla Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPantalla item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_Pantalla> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Pantalla>(ScriptsDataBase.UDP_tbPantallas_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbPantalla item)
        {
            throw new NotImplementedException();
        }
    }
}
