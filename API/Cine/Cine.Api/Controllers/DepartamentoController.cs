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
    public class DepartamentoController : ControllerBase
    {
        private readonly GeneralService _GeneralService;
        private readonly IMapper _mapper;

        public DepartamentoController(GeneralService GeneralService, IMapper mapper)
        {
            _GeneralService = GeneralService;
            _mapper = mapper;
        }


        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _GeneralService.DepartamentoList();
            return Ok(listado);
        }

        [HttpPost("Insertar")]
        public IActionResult Create(DepartamentoViewModel item)
        {
            var listadoMapeado = _mapper.Map<tbDepartamento>(item);
            var listado = _GeneralService.InsertarDepartamentos(listadoMapeado);
            return Ok(listado);
        }

        [HttpGet("Departamento/Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _GeneralService.BuscarDepartamento(id);
            return Ok(listado);
        }

        [HttpPut("Departamento/Update/{id}")]
        public IActionResult Edit(DepartamentoViewModel item)
        {
            var listado = _mapper.Map<tbDepartamento>(item);
            var Result = _GeneralService.UpdateDepartamento(listado);
            return Ok(Result);
        }

        [HttpPost("Departamento/Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var listado = _GeneralService.BorrarDepartamento(id);
            return Ok(listado);
        }

    }
}
