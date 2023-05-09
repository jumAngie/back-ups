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
    public class UsuarioRepository : IRepository<tbUsuario, VW_Usuario>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_Usuario Find(int id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbUsuario item)
        {
            throw new NotImplementedException();
        }


        public VW_Usuario UserValid(tbUsuario item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@correoElectronico", item.user_NombreUsuario, DbType.String, ParameterDirection.Input);
            parametros.Add("@contrasenia", item.user_Contrasenia, DbType.String, ParameterDirection.Input);

            return db.QueryFirst<VW_Usuario>(ScriptsDataBase.UDP_ValidarLogIN, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_Usuario> List()
        {   
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Usuario>(ScriptsDataBase.UDP_tbUsuario_Select, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbUsuario item)
        {
            throw new NotImplementedException();
        }
    }
}
