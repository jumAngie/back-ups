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
    public class DirectorRepository : IRepository<tbDirectore, VW_tbDirector>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@dire_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbDirectores_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_tbDirector Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@dire_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbDirector>(ScriptsDataBase.UDP_tbDirector_FIND, parametros, commandType: CommandType.StoredProcedure);

        }


        public RequestStatus Insert(tbDirectore item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
             parametros.Add("@dire_Nombres", item.dire_Nombres, DbType.String, ParameterDirection.Input);
             parametros.Add("@dire_Apellidos", item.dire_Apellidos, DbType.String, ParameterDirection.Input);
             parametros.Add("@dire_FechaNacimiento", item.dire_FechaNacimiento, DbType.String, ParameterDirection.Input);
             parametros.Add("@dire_Sexo", item.dire_Sexo, DbType.String, ParameterDirection.Input);
             parametros.Add("@dire_UsuCrea", item.dire_UsuCrea, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbDirectores_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_tbDirector> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbDirector>(ScriptsDataBase.UDP_tbDirector_SELECT, null, commandType: CommandType.StoredProcedure);

        }



        public RequestStatus Update(tbDirectore item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@dire_Id", item.dire_Id, DbType.Int32, ParameterDirection.Input);

            parametros.Add("@dire_Nombres", item.dire_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@dire_Apellidos", item.dire_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@dire_FechaNacimiento", item.dire_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@dire_Sexo", item.dire_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@dire_UsuCrea", item.dire_Nombres, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbDirectores_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
