using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using MultiLiga_IOP.Services;
using MultiLiga_IOP.Models;

namespace MultiLiga_IOP.Controllers
{
    public class DisciplineController : Controller
    {
        IDisciplineService _disciplineService;
        
        public DisciplineController(IDisciplineService disciplineService)
        {
            _disciplineService = disciplineService;
        }

        public async Task<IActionResult> Get()
        {   
            try
            {
                return Ok(await _disciplineService.GetDisciplines());
            }
            catch (Exception e)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    e.Message);
            }
        }
    }
}
