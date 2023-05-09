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
    public class PeliculasController : Controller
    {
        private readonly CineService _cineService;
        private readonly IMapper _mapper;
        public PeliculasController(CineService cineService, IMapper mapper)
        {
            _cineService = cineService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _cineService.PeliculasList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(PeliculaViewModel item)
        {
            tbPelicula peli = new tbPelicula();
            peli.peli_Titulo = item.peli_Titulo;
            peli.peli_TitulOriginal = item.peli_TitulOriginal;
            peli.peli_AnioEstreno = item.peli_AnioEstreno;
            peli.peli_Duracion = item.peli_Duracion;
            peli.peli_Categoria = item.peli_Categoria;
            peli.peli_Director = item.peli_Director;
            peli.peli_UsuCrea = item.peli_UsuCrea;

            var listado = _cineService.InsertarPeliculas(peli);
            return Ok(listado);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _cineService.BuscarPeliculas(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(PeliculaViewModel item)
        {
            var listado = _mapper.Map<tbPelicula>(item);
            var Result = _cineService.UpdatePeliculas(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _cineService.BorrarPeliculas(id);
            return Ok(listado);
        }
    }
}
