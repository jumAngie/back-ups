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

    public class FacturaController : Controller
    {
        private readonly CineService _cineService;
        private readonly IMapper _mapper;

        public FacturaController(CineService cineService, IMapper mapper)
        {
            _cineService = cineService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _cineService.FacturasList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(FacturaViewModel item)
        {
            tbFactura factura = new tbFactura();
            factura.fact_Nombres = item.fact_Nombres;
            factura.fact_RTN = item.fact_RTN;
            factura.fact_Apellidos = item.fact_Apellidos;
            factura.fact_UsuCrea = item.fact_UsuCrea;

            var listado = _cineService.InsertarFacturas(factura);
            return Ok(listado);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _cineService.BuscarFacturas(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(FacturaViewModel item)
        {
            var listado = _mapper.Map<tbFactura>(item);
            var Result = _cineService.UpdateFacturas(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _cineService.BorrarFacturas(id);
            return Ok(listado);
        }
    }
}
