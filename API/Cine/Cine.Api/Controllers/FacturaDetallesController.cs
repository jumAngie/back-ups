using AutoMapper;
using Cine.Api.Models;
using Cine.BusinessLogic.Services.Cine;
using Cine.Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Cine.DataAccess.Repository.Cine;

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

        [HttpPost("Factura")]
        public IActionResult FacturaFinal(FacturaFinalVIewModel item)
        {
            string clie_RTN = item.clie_RTN;
            int fade_Factura = (int)item.fade_Factura;

            var listado = _cineService.FacturaDetalleFinalList(clie_RTN, fade_Factura);
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(FacturaDetalleViewModel item)
        {
            tbFacturaDetalle fact = new tbFacturaDetalle();
            item.fade_ContenidoCombo = JsonConvert.SerializeObject(item.fade_ContenidoComboS);
            item.fade_ContenidoInsumo = JsonConvert.SerializeObject(item.fade_ContenidoInsumoS);

            var listado = _mapper.Map<tbFacturaDetalles>(item);
            var Result = _cineService.InsertarFacturaDetalles(listado);
            return Ok(Result);
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

        //Tikets
        [HttpPost("Tikect/Insert")]
        public IActionResult InsertTicket(TicketViewModel item)
        {

            var listado = _mapper.Map<tbTicket>(item);
            var Result = _cineService.InsertarTicket(listado);
            return Ok(Result);
        }
    }
}
