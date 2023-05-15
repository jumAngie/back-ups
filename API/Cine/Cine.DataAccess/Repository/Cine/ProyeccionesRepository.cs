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
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@proy_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbProyecciones_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_Proyeccione Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@proy_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_Proyeccione>(ScriptsDataBase.UDP_tbProyecciones_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbProyeccione item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@proy_Pelicula", item.proy_Pelicula, DbType.Int64, ParameterDirection.Input);
            parametros.Add("@proy_Sala", item.proy_Sala, DbType.Int64, ParameterDirection.Input);
            parametros.Add("@proy_Horario", item.proy_Horario, DbType.Int64, ParameterDirection.Input);
            
            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbProyecciones_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_Proyeccione> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Proyeccione>(ScriptsDataBase.UDP_tbProyecciones_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbProyeccione item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@proy_Id", item.proy_Id, DbType.Int64, ParameterDirection.Input);
            parametros.Add("@proy_Pelicula", item.proy_Pelicula, DbType.Int64, ParameterDirection.Input);
            parametros.Add("@proy_Sala", item.proy_Sala, DbType.Int64, ParameterDirection.Input);
            parametros.Add("@proy_Horario", item.proy_Horario, DbType.Int64, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbProyecciones_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<tbAsiento> ListAsientos(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@asie_Sala", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<tbAsiento>(ScriptsDataBase.UDP_tbAsientos_SELECT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_tbHorario> ListHorario()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            return db.Query<VW_tbHorario>(ScriptsDataBase.UDP_tbHorario_SELECT, null, commandType: CommandType.StoredProcedure);

        }
    }
}
