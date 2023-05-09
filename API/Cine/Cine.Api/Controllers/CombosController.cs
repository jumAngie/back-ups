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
    public class CombosController : Controller
    {
        private readonly CineService _cineService;
        private readonly IMapper _mapper;

        public CombosController(CineService cineService, IMapper mapper)
        {
            _cineService = cineService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _cineService.CombosList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(CombosViewModel item)
        {
            tbCombo combo = new tbCombo();
            combo.comb_Descripcion = item.comb_Descripcion;
            combo.comb_Precio = item.comb_Precio;
            combo.comb_UserCrea = item.comb_UserCrea;

            var listado = _cineService.InsertarCombos(combo);
            return Ok(listado);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _cineService.BuscarCombos(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(CombosViewModel item)
        {
            var listado = _mapper.Map<tbCombo>(item);
            var Result = _cineService.UpdateCombos(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _cineService.BorrarCombos(id);
            return Ok(listado);
        }
    }
}
