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

    public class RolPantallasController : Controller
    {
        private readonly AccessService _accessService;
        private readonly IMapper _mapper;

        public RolPantallasController(AccessService accessService, IMapper mapper)
        {
            _accessService = accessService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _accessService.RolXPantallasList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(RolPantallasViewModel item)
        {
            tbRolesPantalla rol = new tbRolesPantalla();
            rol.ropa_Pantalla = item.ropa_Pantalla;
            rol.ropa_Rol = item.ropa_Rol;
            rol.ropa_UserCrea = item.ropa_UserCrea;

            var listado = _accessService.InsertarRolXPantallas(rol);
            return Ok(listado);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _accessService.BuscarRolXPantalla(id);
            return Ok(listado);
        }


        [HttpGet("DibujarMenu/{Rol},{Admin}")]

        public IActionResult DibujarMenu (int Rol, bool Admin)
        {
            var listado = _accessService.DibujadoMenu(Rol, Admin);
            return Ok(listado);
        }

        [HttpGet("ListarPantallas/{id}")]
        public IActionResult ListarPantallas(int id)
        {
            var listado = _accessService.PantallasPorRol(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(RolPantallasViewModel item)
        {
            var listado = _mapper.Map<tbRolesPantalla>(item);
            var Result = _accessService.UpdateRolXPantallas(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _accessService.BorrarRolXPantalla(id);
            return Ok(listado);
        }
    }
}
