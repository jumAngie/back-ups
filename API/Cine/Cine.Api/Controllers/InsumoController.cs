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
    public class InsumoController : Controller
    {
        private readonly CineService _cineService;
        private readonly IMapper _mapper;

        public InsumoController(CineService cineService, IMapper mapper)
        {
            _cineService = cineService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _cineService.InsumoList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(InsumoViewModel item)
        {
            var listado = _mapper.Map<tbInsumo>(item);
            var Result = _cineService.InsertarInsumo(listado);
            return Ok(Result);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _cineService.BuscarInsumo(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(InsumoViewModel item)
        {
            var listado = _mapper.Map<tbInsumo>(item);
            var Result = _cineService.UpdateInsumo(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _cineService.BorrarInsumo(id);
            return Ok(listado);
        }
    }
}
