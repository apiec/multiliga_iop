using Microsoft.AspNetCore.Mvc;
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

        public async Task<IActionResult> Get([FromQuery] int? leagueId, [FromQuery] string keyword)
        {
            if (leagueId is null)
            {
                return BadRequest();
            }

            if (keyword is null)
            {
                return Ok(await _seasonService.GetSeasonsByLeague((int)leagueId));
            }

            return Ok(await _seasonService.SearchSeasonsByLeague((int)leagueId, keyword));
        }
    }
}
