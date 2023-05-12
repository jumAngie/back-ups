using AutoMapper;
using Cine.Api.Models;
using Cine.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Extensions
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {// Mapeo de el model a la tabla

            CreateMap<DepartamentoViewModel, tbDepartamento>().ReverseMap();
            CreateMap<EmpleadoViewModel, tbEmpleado>().ReverseMap();
            CreateMap<DirectorViewModel, tbDirectore>().ReverseMap();
            CreateMap<InsumoViewModel, tbInsumo>().ReverseMap();
            CreateMap<SucursalViewModel, tbSucursale>().ReverseMap();
            CreateMap<PeliculaViewModel, tbPelicula>().ReverseMap();
            CreateMap<UserViewModel, tbUsuario>().ReverseMap();

            // 07 05 2023
            CreateMap<CombosDetalleViewModel, tbComboDetalle>().ReverseMap();
            CreateMap<CategoriaViewModel, tbCategoria>().ReverseMap();
            CreateMap<SalaViewModel, tbSala>().ReverseMap();
            CreateMap<CargoViewModel, tbCargo>().ReverseMap();
            CreateMap<MetodoPagoViewModel, tbMetodosPago>().ReverseMap();
            CreateMap<ClientesViewModel, tbCliente>().ReverseMap();
            CreateMap<FacturaViewModel, tbFactura>().ReverseMap();
            CreateMap<FacturaDetalleViewModel, tbFacturaDetalle>().ReverseMap();
            CreateMap<RolesViewModel, tbRole>().ReverseMap();
            CreateMap<RolPantallasViewModel, tbRolesPantalla>().ReverseMap();
            CreateMap<PantallasViewModel, tbPantalla>().ReverseMap();
            CreateMap<TicketViewModel, tbTicket>().ReverseMap();
        }
    }
}
