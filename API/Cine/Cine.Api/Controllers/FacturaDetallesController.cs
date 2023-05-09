using AutoMapper;
using Cine.Api.Models;
using Cine.BusinessLogic.Services.Cine;
using Cine.Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class FacturaDetallesController : Controller
    {
        private readonly CineService _cineService;
        private readonly IMapper _mapper;

        public FacturaDetallesController(CineService cineService, IMapper mapper)
        {
            _cineService = cineService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _cineService.FacturaDetalleList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(FacturaDetalleViewModel item)
        {
            tbFacturaDetalle facde = new tbFacturaDetalle();
            facde.fade_Factura = item.fade_Factura;
            facde.fade_ComboDetalle = item.fade_ComboDetalle;
            facde.fade_Proyeccion = item.fade_Proyeccion;
            facde.fade_UsuCrea = item.fade_UsuCrea;

            var listado = _cineService.InsertarFacturaDetalles(facde);
            return Ok(listado);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _cineService.BuscarFacturaDetalles(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(FacturaDetalleViewModel item)
        {
            var listado = _mapper.Map<tbFacturaDetalle>(item);
            var Result = _cineService.UpdateFacturaDetalles(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _cineService.BorrarFacturaDetalles(id);
            return Ok(listado);
        }
    }
}
