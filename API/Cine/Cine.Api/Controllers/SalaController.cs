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

    public class SalaController : Controller
    {
        private readonly CineService _cineService;
        private readonly IMapper _mapper;

        public SalaController(CineService cineService, IMapper mapper)
        {
            _cineService = cineService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _cineService.SalasList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(SalaViewModel item)
        {
            tbSala sala = new tbSala();
            sala.sala_Butacas = item.sala_Butacas;
            sala.sala_Sucursal = item.sala_Sucursal;
            sala.sala_Tipo = item.sala_Tipo;
            sala.sala_UserCrea = item.sala_UserCrea;

            var listado = _cineService.InsertarSalas(sala);
            return Ok(listado);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _cineService.BuscarSalas(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(SalaViewModel item)
        {
            var listado = _mapper.Map<tbSala>(item);
            var Result = _cineService.UpdateSalas(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _cineService.BorrarSalas(id);
            return Ok(listado);
        }
    }
}
