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
    public class DepartamentoRepository : IRepository<tbDepartamento, VW_Departamento>
    {
        public RequestStatus DeleteD(string id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@dept_Id",  id, DbType.String, ParameterDirection.Input);
 
            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_Departamento_Delete, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_Departamento Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@dept_Id", id, DbType.String, ParameterDirection.Input);

            return db.QueryFirst<VW_Departamento>(ScriptsDataBase.UDP_Departamento_Find, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbDepartamento item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@dept_Id", item.dept_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@dept_Descripcion", item.dept_Descripcion, DbType.String, ParameterDirection.Input);
            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_Departamento_Insert, parametros, commandType: CommandType.StoredProcedure);


         }

        public IEnumerable<VW_Departamento> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Departamento>(ScriptsDataBase.UDP_Prueba_Departamento, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbDepartamento item)
        {

            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@dept_Id", item.dept_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@dept_Descripcion", item.dept_Descripcion, DbType.String, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_Departamento_Update, parametros, commandType: CommandType.StoredProcedure);
         }
    }
}
