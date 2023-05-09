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
    public class DirectorController : Controller
    {
        private readonly CineService _cineService;
        private readonly IMapper _mapper;

        public DirectorController(CineService cineService, IMapper mapper)
        {
            _cineService = cineService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _cineService.DirectoreList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(DirectorViewModel item)
        {
            tbDirectore director = new tbDirectore();
            director.dire_Nombres = item.dire_Nombres;
            director.dire_Apellidos = item.dire_Apellidos;
            director.dire_FechaNacimiento = item.dire_FechaNacimiento;
            director.dire_Sexo = item.dire_Sexo;
            director.dire_UsuCrea = item.dire_UsuCrea;

            var listado = _cineService.InsertarDirectore(director);
            return Ok(listado);
        }


        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _cineService.BuscarDirectore(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(DirectorViewModel item)
        {
            var listado = _mapper.Map<tbDirectore>(item);
            var Result = _cineService.UpdateDirectore(listado);
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
