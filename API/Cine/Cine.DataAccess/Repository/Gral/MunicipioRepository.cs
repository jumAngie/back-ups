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
    public class MunicipioRepository : IRepository<tbMunicipio, tbMunicipio>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public tbMunicipio Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMunicipio item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbMunicipio> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbMunicipio item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbMunicipio> FindState(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@muni_depId", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<tbMunicipio>(ScriptsDataBase.UDP_tbMunicipio_DDL, parametros, commandType: CommandType.StoredProcedure);

        }

    }
}
