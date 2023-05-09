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

    public class RolesController : Controller
    {

        private readonly AccessService _accessService;
        private readonly IMapper _mapper;

        public RolesController(AccessService accessService, IMapper mapper)
        {
            _accessService = accessService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _accessService.RolesList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(RolesViewModel item)
        {
            tbRole rol = new tbRole();
            rol.role_Nombre = item.role_Nombre;
            rol.role_UsuCreacion = item.role_UsuCreacion;

            var listado = _accessService.InsertarRoles(rol);
            return Ok(listado);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _accessService.BuscarRoles(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(RolesViewModel item)
        {
            var listado = _mapper.Map<tbRole>(item);
            var Result = _accessService.UpdateRoles(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _accessService.BorrarRoles(id);
            return Ok(listado);
        }
    }
}
