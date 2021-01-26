using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Services;

namespace MultiLiga_IOP.Controllers
{
    public class LeagueController : Controller
    {
        ILeagueService _leagueService;

        public LeagueController(ILeagueService leagueService)
        {
            _leagueService = leagueService;
        }

        public async Task<IActionResult> Get([FromQuery] int? disciplineId)
        {
            try
            {
                return Ok(await _leagueService.GetLeagues(disciplineId));
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
