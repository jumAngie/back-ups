using Cine.DataAccess.Repository;
using Cine.DataAccess.Repository.Cine;
using Cine.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Terminal.BusinessLogic;
using Terminal.DataAccess.Repository;

namespace Cine.BusinessLogic.Services.Cine
{
    public class CineService
    {
        private readonly DirectorRepository _directorRepository;
        private readonly InsumoRepository  _insumoRepository;
        private readonly SucursalesRepository  _sucurdalRepository;
        private readonly PeliculasRepository _peliculasRepository;
        private readonly CombosRepository _combosRepository;
        private readonly FacturaDetallesRepository _facturaDetallesRepository;
        private readonly FacturasRepository _facturasRepository;
        private readonly ProyeccionesRepository _proyeccionesRepository;
        private readonly SalaRepository _salaRepository;

        //INYECCION DE DEPENDENCIA
        public CineService(DirectorRepository           directorRepository,
                             InsumoRepository           insumoRepository,
                             SucursalesRepository       sucurdalRepository,
                             PeliculasRepository        peliculasRepository,
                             CombosRepository           combosRepository,
                             FacturasRepository facturasRepository,
                             FacturaDetallesRepository facturaDetallesRepository,
                             SalaRepository salaRepository,
                             ProyeccionesRepository proyeccionesRepository)
        {
            _directorRepository = directorRepository;
            _insumoRepository = insumoRepository;
            _sucurdalRepository = sucurdalRepository;
            _peliculasRepository = peliculasRepository;
            _proyeccionesRepository = proyeccionesRepository;
            _combosRepository = combosRepository;
            _salaRepository = salaRepository;
            _facturaDetallesRepository = facturaDetallesRepository;
            _facturasRepository = facturasRepository;

        }



        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        #region Peliculas
        public ServiceResult PeliculasList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _peliculasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarPeliculas(tbPelicula item)
        {
            var result = new ServiceResult();

            var map = _peliculasRepository.Insert(item);
            return result.Ok(map);
        }

        public VW_tbPelicula BuscarPeliculas(int id)
        {
            try
            {
                return _peliculasRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus BorrarPeliculas(int id)
        {
            try
            {
                return _peliculasRepository.Delete(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RequestStatus UpdatePeliculas(tbPelicula tbPelicula)
        {
            try
            {
                return _peliculasRepository.Update(tbPelicula);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Combos
        public ServiceResult CombosList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _combosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarCombos(tbCombo item)
        {
            var result = new ServiceResult();

            var map = _combosRepository.Insert(item);
            return result.Ok(map);
        }

        public VW_tbCombo BuscarCombos(int id)
        {
            try
            {
                return _combosRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus BorrarCombos(int id)
        {
            try
            {
                return _combosRepository.Delete(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RequestStatus UpdateCombos(tbCombo tbCombo)
        {
            try
            {
                return _combosRepository.Update(tbCombo);
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region CombosDetalles
        #endregion

        #region Proyecciones
        public ServiceResult ListProyecciones()
        {
            var result = new ServiceResult();


            try
            {
                var list = _proyeccionesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult ListAsiento(int id)
        {
            var result = new ServiceResult();


            try
            {
                var list = _proyeccionesRepository.ListAsientos(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }
        #endregion

        // 07 05 2023
        #region Factura
        public ServiceResult FacturasList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _facturasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }



        public ServiceResult InsertarFacturas(tbFactura item)
        {
            var result = new ServiceResult();

            var map = _facturasRepository.Insert(item);
            return result.Ok(map);
        }

        public VW_tbFactura BuscarFacturas(int id)
        {
            try
            {
                return _facturasRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus BorrarFacturas(int id)
        {
            try
            {
                return _facturasRepository.Delete(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus UpdateFacturas(tbFactura tabla)
        {
            try
            {
                return _facturasRepository.Update(tabla);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Factura Detalle
        public ServiceResult FacturaDetalleList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _facturaDetallesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult FacturaDetalleFinalList(string clie_RTN, int fade_Factura)
        {
            var result = new ServiceResult();
            try
            {
                var list = _facturaDetallesRepository.ListFinal(clie_RTN, fade_Factura);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarFacturaDetalles(tbFacturaDetalles item)
        {
            var result = new ServiceResult();

            var map = _facturaDetallesRepository.Insert2(item);
            return result.Ok(map);
        }

        public VW_tbFacturaDetalle BuscarFacturaDetalles(int id)
        {
            try
            {
                return _facturaDetallesRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus BorrarFacturaDetalles(int id)
        {
            try
            {
                return _facturaDetallesRepository.Delete(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ServiceResult InsertarTicket(tbTicket item)
        {
            var result = new ServiceResult();

            var map = _facturaDetallesRepository.InsertTickey(item);
            return result.Ok(map);
        }
        public RequestStatus UpdateFacturaDetalles(tbFacturaDetalle tabla)
        {
            try
            {
                return _facturaDetallesRepository.Update(tabla);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Sala
        public ServiceResult SalasList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _salaRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarSalas(tbSala item)
        {
            var result = new ServiceResult();

            var map = _salaRepository.Insert(item);
            return result.Ok(map);
        }

        public VW_Sala BuscarSalas(int id)
        {
            try
            {
                return _salaRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus BorrarSalas(int id)
        {
            try
            {
                return _salaRepository.Delete(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus UpdateSalas(tbSala tabla)
        {
            try
            {
                return _salaRepository.Update(tabla);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion


        #region Proyecciones
        public ServiceResult InsertarProyeccion(tbProyeccione item)
        {
            var result = new ServiceResult();
            var map = _proyeccionesRepository.Insert(item);
            return result.Ok(map);
        }
        public VW_Proyeccione BuscarProyeccion(int id)
        {
            try
            {
                return _proyeccionesRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }
        public RequestStatus BorrarProyeccion(int id)
        {
            try
            {
                return _proyeccionesRepository.Delete(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public RequestStatus UpdateProyeccion(tbProyeccione item)
        {
            try
            {
                return _proyeccionesRepository.Update(item);
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Horarios
        public ServiceResult ListHorario()
        {
            var result = new ServiceResult();
            try
            {
                var list = _proyeccionesRepository.ListHorario();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        #endregion


        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        #region Director
        public ServiceResult DirectoreList()
        {

            var result = new ServiceResult();

            try
            {

                var list = _directorRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarDirectore(tbDirectore item)
        {
            var result = new ServiceResult();

            var map = _directorRepository.Insert(item);
            return result.Ok(map);




        }
        public VW_tbDirector BuscarDirectore(int id)
        {
            try
            {
                return _directorRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus BorrarDirectore(int id)
        {
            try
            {
                return _directorRepository.Delete(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RequestStatus UpdateDirectore(tbDirectore tbDepartamento)
        {
            try
            {
                return _directorRepository.Update(tbDepartamento);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        #endregion

        #region Insumo
        public ServiceResult InsumoList()
        {

            var result = new ServiceResult();
             
            try
            {
                    var list = _insumoRepository.List();
                    return result.Ok(list);
             }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarInsumo(tbInsumo item)
        {
            var result = new ServiceResult();

            var map = _insumoRepository.Insert(item);
            return result.Ok(map);
        }

        public VW_tbInsumo BuscarInsumo(int id)
        {
            try
            {
                return _insumoRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus BorrarInsumo(int id)
        {
            try
            {
                return _insumoRepository.Delete(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RequestStatus UpdateInsumo(tbInsumo tbInsumo)
        {
            try
            {
                return _insumoRepository.Update(tbInsumo);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Sucursal
        public ServiceResult SucursalList()
        {
            var result = new ServiceResult();
    
            try
            {
                var list = _sucurdalRepository.List();
                return result.Ok(list);
             }
            catch (Exception e)
            {

                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarSucursal(tbSucursale item)
        {
            var result = new ServiceResult();
            var map = _sucurdalRepository.Insert(item);
            return result.Ok(map);
        }
        public VW_tbSUCURSAL BuscarSucursal(int id)
        {
            try
            {
                return _sucurdalRepository.Find(id);
            }
            catch (Exception)
            {
                return null;
            }
        }
        public RequestStatus BorrarSucursal(int id)
        {
            try
            {
                return _sucurdalRepository.Delete(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public RequestStatus UpdateSucursal(tbSucursale item)
        {
            try
            {
                return _sucurdalRepository.Update(item);
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion
    }
}
