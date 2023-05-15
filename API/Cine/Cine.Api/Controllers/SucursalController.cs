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
    public class SucursalController : Controller
    {
        private readonly CineService _cineService;
        private readonly IMapper _mapper;

        public SucursalController(CineService cineService, IMapper mapper)
        {
            _cineService = cineService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _cineService.SucursalList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(SucursalViewModel item)
        {

            var listado = _mapper.Map<tbSucursale>(item);
            var result = _cineService.InsertarSucursal(listado);
            return Ok(result);
        }


        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _cineService.BuscarSucursal(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(SucursalViewModel item)
        {
            var listado = _mapper.Map<tbSucursale>(item);
            var Result = _cineService.UpdateSucursal(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _cineService.BorrarDirectore(id);
            return Ok(listado);
        }
    }
}
