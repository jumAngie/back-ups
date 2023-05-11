using Cine.DataAccess.Repository;
using Cine.DataAccess.Repository.Acce;
using Cine.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Terminal.BusinessLogic;
using Terminal.DataAccess.Repository;

namespace Cine.BusinessLogic.Services.Access
{
    public class AccessService
    {
        private readonly UsuarioRepository _usuarioRepository;
        private readonly PantallasRepository _pantallasRepository;
        private readonly RolPantallasRepository _rolPantallasRepository;
        private readonly RolRepository _rolRepository;

        //INYECCION DE DEPENDENCIA
        public AccessService(UsuarioRepository usuarioRepository,
                            PantallasRepository pantallasRepository,
                            RolPantallasRepository rolPantallasRepository,
                            RolRepository rolRepository)
        {
            _usuarioRepository = usuarioRepository;
            _pantallasRepository = pantallasRepository;
            _rolPantallasRepository = rolPantallasRepository;
            _rolRepository = rolRepository;
 
        }

        #region Pantallas
        public ServiceResult PantallasList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _pantallasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }
        #endregion

        #region Rol X Pantallas

        public ServiceResult DibujadoMenu(int Rol, bool Admin)
        {

            var result = new ServiceResult();
            try
            {
                var list = _rolPantallasRepository.DibujadoMenu(Rol, Admin);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult RolXPantallasList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _rolPantallasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }
        public ServiceResult PantallasPorRol(int Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolPantallasRepository.PantallasPorRol(Id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarRolXPantallas(tbRolesPantalla item)
        {
            var result = new ServiceResult();

            var map = _rolPantallasRepository.Insert(item);
            return result.Ok(map);
        }

        public VW_RolPantalla BuscarRolXPantalla(int id)
        {
            try
            {
                return _rolPantallasRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        
        public RequestStatus BorrarRolXPantalla(int id)
        {
            try
            {
                return _rolPantallasRepository.Delete(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus UpdateRolXPantallas(tbRolesPantalla tabla)
        {
            try
            {
                return _rolPantallasRepository.Update(tabla);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Rol
        public ServiceResult RolesList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _rolRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarRoles(tbRole item)
        {
            var result = new ServiceResult();

            var map = _rolRepository.Insert(item);
            return result.Ok(map);
        }

        public VW_tbRole BuscarRoles(int id)
        {
            try
            {
                return _rolRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus BorrarRoles(int id)
        {
            try
            {
                return _rolRepository.Delete(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus UpdateRoles(tbRole tabla)
        {
            try
            {
                return _rolRepository.Update(tabla);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Usuarios
        public ServiceResult UsuarioList()
        {

            var result = new ServiceResult();

            try
            {
                var list = _usuarioRepository.List();
                return result.Ok(list);

            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult ValidPassword(tbUsuario iteam)
        {
            var result = new ServiceResult();

            try
            {
                var list = _usuarioRepository.UserValid(iteam);
                return result.Ok(list);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

    }
}
