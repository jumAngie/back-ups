using AutoMapper;
using Cine.Api.Models;
using Cine.BusinessLogic.Services.General;
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
    public class MetodoPagoController : Controller
    {
        private readonly GeneralService _generalesServices;
        private readonly IMapper _mapper;

        public MetodoPagoController(GeneralService generalService, IMapper mapper)
        {
            _generalesServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _generalesServices.MetodoPagoList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(MetodoPagoViewModel item)
        {
            tbMetodosPago pago = new tbMetodosPago();
            pago.pago_Descripcion = item.pago_Descripcion;
            pago.pago_UsuarioCreador = item.pago_UsuarioCreador;

            var listado = _generalesServices.InsertarMetodoPago(pago);
            return Ok(listado);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _generalesServices.BuscarMetodoPago(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(MetodoPagoViewModel item)
        {
            var listado = _mapper.Map<tbMetodosPago>(item);
            var Result = _generalesServices.UpdateMetodoPago(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _generalesServices.BorrarMetodoPago(id);
            return Ok(listado);
        }

    }
}
