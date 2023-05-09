using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using Microsoft.Data.SqlClient;
using Cine.Entities.Entities;
using Terminal.DataAccess.Repository;
using System.Data;

namespace Cine.DataAccess.Repository.Gral
{
    public class CategoriasRepository : IRepository<tbCategoria, VW_Categoria>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cate_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbCategorias_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_Categoria Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cate_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_Categoria>(ScriptsDataBase.UDP_tbCategorias_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbCategoria item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@cate_Nombre", item.cate_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@cate_UsuarioCreador", item.cate_UsuarioCreador, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbCategorias_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_Categoria> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_Categoria>(ScriptsDataBase.UDP_tbCategorias_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbCategoria item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cate_Id", item.cate_Id, DbType.Int32, ParameterDirection.Input);

            parametros.Add("@cate_Nombre", item.cate_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@cate_UsuarioModificador", item.cate_UsuarioModificador, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbCategorias_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
