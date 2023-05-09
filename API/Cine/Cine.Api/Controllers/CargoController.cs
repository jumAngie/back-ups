﻿using AutoMapper;
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
    public class CargoController : Controller
    {
        private readonly GeneralService _GeneralService;
        private readonly IMapper _mapper;

        //INYECCION DE DEPENDENCIA
        public CargoController(GeneralService GeneralService, IMapper mapper)
        {
            _GeneralService = GeneralService;
            _mapper = mapper;
        }


        [HttpGet("List")]
        public IActionResult List()
        {
            var listado = _GeneralService.CargoList();
            return Ok(listado);
        }
    }
}
