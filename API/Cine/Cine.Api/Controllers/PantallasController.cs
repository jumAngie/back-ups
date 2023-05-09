using AutoMapper;
using Cine.Api.Models;
using Cine.BusinessLogic.Services.Access;
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

    public class PantallasController : Controller
    {
        private readonly AccessService _accessService;
        private readonly IMapper _mapper;

        public PantallasController(AccessService accessService, IMapper mapper)
        {
            _accessService = accessService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _accessService.PantallasList();
            return Ok(listado);
        }

       
    }
}
