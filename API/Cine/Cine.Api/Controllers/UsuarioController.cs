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
    public class UsuarioController : Controller
    {
        private readonly AccessService _accessService;
        private readonly IMapper _mapper;

        public UsuarioController(AccessService accessService, IMapper mapper)
        {
            _accessService = accessService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _accessService.UsuarioList();
            return Ok(listado);
        }

        [HttpPost("LogIn")]
        public IActionResult ValidUser(ValidUserViewModel item)
        {
            tbUsuario usu = new tbUsuario();
            usu.user_NombreUsuario = item.user_NombreUsuario;
            usu.user_Contrasenia = item.user_Contrasenia;
            var listado = _accessService.ValidPassword(usu);
            return Ok(listado);
        }
    }
}
