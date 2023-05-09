using Cine.Entities.Entities;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Terminal.DataAccess.Repository;

namespace Cine.DataAccess.Repository.Cine
{
    public class PeliculasRepository : IRepository<tbPelicula, VW_tbPelicula>
    {
        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        public IEnumerable<VW_tbPelicula> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbPelicula>(ScriptsDataBase.UPD_tbPeliculas_SELECT, null, commandType: CommandType.StoredProcedure);
        }
       
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@peli_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbPeliculas_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_tbPelicula Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@peli_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbPelicula>(ScriptsDataBase.UDP_tbPeliculas_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbPelicula item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@peli_Titulo ",         item.peli_Titulo,           DbType.String,  ParameterDirection.Input);
            parametros.Add("@peli_TitulOriginal",   item.peli_TitulOriginal,    DbType.String,  ParameterDirection.Input);
            parametros.Add("@peli_AnioEstreno",     item.peli_AnioEstreno,      DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@peli_Duracion",        item.peli_Duracion,         DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@peli_Categoria",       item.peli_Categoria,        DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@peli_Director",        item.peli_Director,         DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@peli_UsuCrea",         item.peli_UsuCrea,          DbType.Int32,   ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbPeliculas_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbPelicula item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@peli_Id",              item.peli_Id,               DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@peli_Titulo ",         item.peli_Titulo,           DbType.String,  ParameterDirection.Input);
            parametros.Add("@peli_TitulOriginal",   item.peli_TitulOriginal,    DbType.String,  ParameterDirection.Input);
            parametros.Add("@peli_AnioEstreno",     item.peli_AnioEstreno,      DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@peli_Duracion",        item.peli_Duracion,         DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@peli_Categoria",       item.peli_Categoria,        DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@peli_Director",        item.peli_Director,         DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@peli_UsuMofica",       item.peli_UsuMofica,        DbType.Int32,   ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbPeliculas_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }

        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    }
}
