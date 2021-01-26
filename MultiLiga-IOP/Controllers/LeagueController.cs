using Microsoft.AspNetCore.Mvc;
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

        public async Task<IActionResult> Get([FromQuery] int? disciplineId, [FromQuery] string keyword)
        {
            if (disciplineId is null)
            {
                return BadRequest();
            }

            if (keyword is null)
            {
                return Ok(await _leagueService.GetLeagues((int)disciplineId));
            }

            return Ok(await _leagueService.SearchLeagues((int)disciplineId, keyword));
        }
    }
}
