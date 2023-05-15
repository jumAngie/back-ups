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
    public class ProyeccionController : Controller
    {
        private readonly CineService _cineService;
        private readonly IMapper _mapper;

        public ProyeccionController(CineService cineService, IMapper mapper)
        {
            _cineService = cineService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _cineService.ListProyecciones();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(ProyeccionViewModel item)
        {

            var listado = _mapper.Map<tbProyeccione>(item);
            var result = _cineService.InsertarProyeccion(listado);
            return Ok(result);
        }


        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _cineService.BuscarProyeccion(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(ProyeccionViewModel item)
        {
            var listado = _mapper.Map<tbProyeccione>(item);
            var Result = _cineService.UpdateProyeccion(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _cineService.BorrarProyeccion(id);
            return Ok(listado);
        }

        [HttpGet("Asientos/{id}")]
        public IActionResult ListAsientos(int id)
        {
            var listado = _cineService.ListAsiento(id);
            return Ok(listado);
        }

        [HttpGet("Horaio")]
        public IActionResult ListHoraio()
        {
            var listado = _cineService.ListHorario();
            return Ok(listado);
        }
    }
}
