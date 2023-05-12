using AutoMapper;
using Cine.BusinessLogic.Services.Cine;
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

        [HttpGet("Asientos/{id}")]
        public IActionResult ListAsientos(int id)
        {
            var listado = _cineService.ListAsiento(id);
            return Ok(listado);
        }
    }
}
