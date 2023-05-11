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
    public class RolPantallasRepository : IRepository<tbRolesPantalla, VW_RolPantalla>
    {
        public RequestStatus Delete(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@ropa_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbRolPantallas_DELETE, parametros, commandType: CommandType.StoredProcedure);

        }

        public VW_RolPantalla Find(int id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@ropa_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_RolPantalla>(ScriptsDataBase.UDP_tbRolPantallas_FIND, parametros, commandType: CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbRolesPantalla item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@ropa_Rol", item.ropa_Rol, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@ropa_Pantalla", item.ropa_Pantalla, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@ropa_UserCrea", item.ropa_UserCrea, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbRolPantallas_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_RolPantalla> List()
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_RolPantalla>(ScriptsDataBase.UDP_tbRolPantallas_SELECT, null, commandType: CommandType.StoredProcedure);

        }

        public IEnumerable<VW_RolPantalla> DibujadoMenu(int Rol, bool Admin)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@rol_Id", Rol, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@EsAdmin", Admin, DbType.Boolean, ParameterDirection.Input);


            return db.Query<VW_RolPantalla>(ScriptsDataBase.UDP_DibujadoMenu, parametros, commandType: CommandType.StoredProcedure);
        }


        public IEnumerable<VW_RolPantalla> PantallasPorRol(int Id)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", Id, DbType.Int32, ParameterDirection.Input);

            return db.Query<VW_RolPantalla>(ScriptsDataBase.UDP_PantallasPorRol, parametros, commandType: CommandType.StoredProcedure);
        }
        public RequestStatus Update(tbRolesPantalla item)
        {
            using var db = new SqlConnection(CineContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@ropa_Id", item.ropa_Id, DbType.Int32, ParameterDirection.Input);

            parametros.Add("@ropa_Rol", item.ropa_Rol, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@ropa_Pantalla", item.ropa_Pantalla, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@ropa_UserMofica", item.ropa_UserMofica, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_tbRolPantallas_INSERT, parametros, commandType: CommandType.StoredProcedure);

        }
    }
}
