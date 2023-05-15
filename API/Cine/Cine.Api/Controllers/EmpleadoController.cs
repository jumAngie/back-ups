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
    public class EmpleadoController : Controller
    {

        private readonly GeneralService _GeneralService;
        private readonly IMapper _mapper;

        public EmpleadoController(GeneralService GeneralService, IMapper mapper)
        {
            _GeneralService = GeneralService;
            _mapper = mapper;
        }


        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _GeneralService.EmpleadosList();
            return Ok(listado);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _GeneralService.BuscarEmpleado(id);
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(EmpleadoViewModel item)
        {
            var listado = _mapper.Map<tbEmpleado>(item);
            var result = _GeneralService.InsertarEmpleado(listado);
            return Ok(result);
        }

        [HttpPut("Update")]
        public IActionResult Edit(EmpleadoViewModel item)
        {
            var listado = _mapper.Map<tbEmpleado>(item);
            var Result = _GeneralService.UpdateEmpleado(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _GeneralService.BorrarEmpleado(id);
            return Ok(listado);
        }

        [HttpGet("EmpleSinUsuario")]
        public IActionResult EmpleSinUsuario()
        {
            var listado = _GeneralService.EmpleadosSinUsuario();
            return Ok(listado);
        }

        [HttpGet("EmpleSinUsuarioEditar/{user_Id}")]
        public IActionResult EmpleSinUsuario_Editar(int user_Id)
        {
            var listado = _GeneralService.EmpleadosSinUsuario_Editar(user_Id);
            return Ok(listado);
        }
    }
}
