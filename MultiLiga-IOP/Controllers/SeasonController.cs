using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Services;


namespace MultiLiga_IOP.Controllers
{
    public class SeasonController : Controller
    {
        ISeasonService _seasonService;

        public SeasonController(ISeasonService seasonService)
        {
            _seasonService = seasonService;
        }

        public async Task<IActionResult> Get([FromQuery] int? leagueId)
        {
            try
            {
                return Ok(await _seasonService.GetSeasonsByLeague(leagueId));
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
