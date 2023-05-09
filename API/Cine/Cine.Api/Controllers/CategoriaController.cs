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
    public class CategoriaController : Controller
    {
        private readonly GeneralService _generalesServices;
        private readonly IMapper _mapper;

        public CategoriaController(GeneralService generalService, IMapper mapper)
        {
            _generalesServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _generalesServices.CategoriasList();
            return Ok(listado);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(CategoriaViewModel item)
        {
            tbCategoria cate = new tbCategoria();
            cate.cate_Nombre = item.cate_Nombre;
            cate.cate_UsuarioCreador = item.cate_UsuarioCreador;

            var listado = _generalesServices.InsertarCategorias(cate);
            return Ok(listado);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _generalesServices.BuscarCategorias(id);
            return Ok(listado);
        }

        [HttpPut("Update")]
        public IActionResult Edit(CategoriaViewModel item)
        {
            var listado = _mapper.Map<tbCategoria>(item);
            var Result = _generalesServices.UpdateCategorias(listado);
            return Ok(Result);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var listado = _generalesServices.BorrarCategorias(id);
            return Ok(listado);
        }
    }
}
