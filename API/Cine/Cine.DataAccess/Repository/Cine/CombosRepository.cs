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
    public class CombosRepository : IRepository<tbCombo, VW_tbCombo>
    {

        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@comb_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbCombos_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_tbCombo Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@comb_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbCombo>(ScriptsDataBase.UDP_tbCombos_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbCombo item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@comb_Descripcion ",    item.comb_Descripcion,  DbType.String,  ParameterDirection.Input);
            parametros.Add("@comb_Precio",          item.comb_Precio,       DbType.String,  ParameterDirection.Input);
            parametros.Add("@comb_UserCrea",        item.comb_UserCrea,     DbType.Int32,   ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbCombos_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_tbCombo> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbCombo>(ScriptsDataBase.UDP_tbCombos_SELECT, null, commandType: CommandType.StoredProcedure);
        
        }

        public RequestStatus Update(tbCombo item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@comb_Id ",             item.comb_Id,                  DbType.Int32,   ParameterDirection.Input);
            parametros.Add("@comb_Descripcion ",    item.comb_Descripcion,         DbType.String,  ParameterDirection.Input);
            parametros.Add("@comb_Precio",          item.comb_Precio,              DbType.String,  ParameterDirection.Input);
            parametros.Add("@comb_UsuarioModifica", item.comb_UsuarioModifica,     DbType.Int32,   ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbCombos_UPDATE, parametros, commandType: CommandType.StoredProcedure);

        }

        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

    }
}
