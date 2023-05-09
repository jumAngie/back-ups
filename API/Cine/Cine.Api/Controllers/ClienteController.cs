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

    public class ClienteController : Controller
    {
        private readonly GeneralService _generalesServices;
        private readonly IMapper _mapper;

        public ClienteController(GeneralService generalService, IMapper mapper)
        {
            _generalesServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _generalesServices.ClientesList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(ClientesViewModel item)
        {
            tbCliente client = new tbCliente();
            client.clie_Nombres = item.clie_Nombres;
            client.clie_Apellidos = item.clie_Apellidos;
            client.clie_RTN = item.clie_RTN;
            client.clie_UserCrea = item.clie_UserCrea;

            var listado = _generalesServices.InsertarClientes(client);
            return Ok(listado);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _generalesServices.BuscarClientes(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(ClientesViewModel item)
        {
            var listado = _mapper.Map<tbCliente>(item);
            var Result = _generalesServices.UpdateClientes(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _generalesServices.BorrarClientes(id);
            return Ok(listado);
        }
    }
}
