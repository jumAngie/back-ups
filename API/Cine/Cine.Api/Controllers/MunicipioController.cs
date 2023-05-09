using AutoMapper;
using Cine.BusinessLogic.Services.General;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cine.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MunicipioController : Controller
    {
        private readonly GeneralService _GeneralService;
        private readonly IMapper _mapper;

        public MunicipioController(GeneralService GeneralService, IMapper mapper)
        {
            _GeneralService = GeneralService;
            _mapper = mapper;
        }

        [HttpGet("FindState/{id}")]
        public IActionResult Edit(int id)
        {
            var listado = _GeneralService.MunicipioDDL(id);
            return Ok(listado);
        }
    }
}
