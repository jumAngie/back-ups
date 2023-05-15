using Cine.DataAccess.Repository;
using Cine.DataAccess.Repository.Gral;
using Cine.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Terminal.BusinessLogic;
using Terminal.DataAccess.Repository;

namespace Cine.BusinessLogic.Services.General
{
    public class GeneralService
    {

        private readonly DepartamentoRepository     _departamentoRepository;
        private readonly EmpleadoRepository         _empleadoRepository;
        private readonly EstadoCivilRepository      _estadoCivilRepository;
        private readonly CargoRepository            _cargoRepository;
        private readonly CategoriasRepository       _categoriaRepository;
        private readonly ClientesRepository         _clientesRepository;
        private readonly MetodoPagoRepository       _metodoPagoRepository;
        private readonly MunicipioRepository _municipioRepository;

        //INYECCION DE DEPENDENCIA
        public GeneralService(DepartamentoRepository    departamentoRepository,
                              EmpleadoRepository        empleadoRepository,
                              EstadoCivilRepository     estadoCivilRepository,
                              CargoRepository           cargoRepository,
                              CategoriasRepository categoriasRepository,
                              ClientesRepository clientesRepository,
                              MetodoPagoRepository metodoPagoRepository,
                              MunicipioRepository municipioRepository)
        {

            _departamentoRepository = departamentoRepository;
            _empleadoRepository = empleadoRepository;
            _estadoCivilRepository = estadoCivilRepository;
            _cargoRepository = cargoRepository;
            _categoriaRepository = categoriasRepository;
            _clientesRepository = clientesRepository;
            _metodoPagoRepository = metodoPagoRepository;
            _municipioRepository = municipioRepository;

        }

        #region Municipio
        public IEnumerable<tbMunicipio> MunicipioDDL(int id)
        {
            try
            {
                return _municipioRepository.FindState(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        // // // // // // // // // // // // // // // // // // // // // // // // // // // //

        #region Categorias
        public ServiceResult CategoriasList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _categoriaRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarCategorias(tbCategoria item)
        {
            var result = new ServiceResult();

            var map = _categoriaRepository.Insert(item);
            return result.Ok(map);
        }

        public VW_Categoria BuscarCategorias(int id)
        {
            try
            {
                return _categoriaRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus BorrarCategorias(int id)
        {
            try
            {
                return _categoriaRepository.Delete(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus UpdateCategorias(tbCategoria tabla)
        {
            try
            {
                return _categoriaRepository.Update(tabla);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Clientes
        public ServiceResult ClientesList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _clientesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarClientes(tbCliente item)
        {
            var result = new ServiceResult();

            var map = _clientesRepository.Insert(item);
            return result.Ok(map);
        }

        public VW_Cliente BuscarClientes(int id)
        {
            try
            {
                return _clientesRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus BorrarClientes(int id)
        {
            try
            {
                return _clientesRepository.Delete(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus UpdateClientes(tbCliente tabla)
        {
            try
            {
                return _clientesRepository.Update(tabla);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Metodo de Pago
        public ServiceResult MetodoPagoList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _metodoPagoRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarMetodoPago(tbMetodosPago item)
        {
            var result = new ServiceResult();

            var map = _metodoPagoRepository.Insert(item);
            return result.Ok(map);
        }

        public VW_MetodoPago BuscarMetodoPago(int id)
        {
            try
            {
                return _metodoPagoRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus BorrarMetodoPago(int id)
        {
            try
            {
                return _metodoPagoRepository.Delete(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus UpdateMetodoPago(tbMetodosPago tabla)
        {
            try
            {
                return _metodoPagoRepository.Update(tabla);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        // // // // // // // // // // // // // // // // // // // // // // // // // // // //

        #region Departamento
        public IEnumerable<VW_Departamento> DepartamentoList()
        {
            try
            {
                return _departamentoRepository.List();
            }
            catch (Exception)
            {

                return Enumerable.Empty<VW_Departamento>();
            }
        }
        public ServiceResult InsertarDepartamentos(tbDepartamento item)
        {
            var result = new ServiceResult();
            
                var map = _departamentoRepository.Insert(item);
                return result.Ok(map);


            
             
        }
        public VW_Departamento BuscarDepartamento(int id)
        {
            try
            {
                return _departamentoRepository.Find(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RequestStatus BorrarDepartamento(string id)
        {
            try
            {
                return _departamentoRepository.DeleteD(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RequestStatus UpdateDepartamento(tbDepartamento tbDepartamento)
        {
            try
            {
                return _departamentoRepository.Update(tbDepartamento);
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Empleados

        public ServiceResult EmpleadosList()
        {
            var result = new ServiceResult();


            try
            {
                var list = _empleadoRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult EmpleadosSinUsuario()
        {
            var result = new ServiceResult();


            try
            {
                var list = _empleadoRepository.EmpleadosSinUsuarios();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult EmpleadosSinUsuario_Editar(int user_Id)
        {
            var result = new ServiceResult();


            try
            {
                var list = _empleadoRepository.EmpleadosSinUsuarios_Editar(user_Id);
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }


        public ServiceResult InsertarEmpleado(tbEmpleado item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadoRepository.Insert(item);
                return result.Ok(map);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }


        }

        public VW_tbEmpleado BuscarEmpleado(int id)
        {
            try
            {
                return _empleadoRepository.Find(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RequestStatus BorrarEmpleado(int id)
        {
            try
            {
                return _empleadoRepository.Delete(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RequestStatus UpdateEmpleado(tbEmpleado iteam)
        {
            try
            {
                return _empleadoRepository.Update(iteam);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        #endregion

        #region Estado Civil
        public ServiceResult EstadoCivilList()
        {

            var result = new ServiceResult();

            try
            {
                var list = _estadoCivilRepository.List();
                return result.Ok(list);
             }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }
        #endregion

        #region Cargo
        public ServiceResult CargoList()
        {

            var result = new ServiceResult();

            try
            {
                var list = _cargoRepository.List();
                return result.Ok(list);
             }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }
        #endregion

    }
}
