using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Services;

namespace MultiLiga_IOP.Controllers
{
    public class RaceController : Controller
    {
        IRaceService _raceService;

        public RaceController(IRaceService raceService)
        {
            _raceService = raceService;
        }

        public async Task<IActionResult> Get([FromQuery] int? seasonId, [FromQuery] string userId, [FromQuery] string keyword)
        {
            if (seasonId is null && userId is null)
            {
                return BadRequest();
            }

            if (seasonId is object)
            {
                if (keyword is null)
                {
                    return Ok(await _raceService.GetRacesBySeason((int)seasonId));
                }
                else
                {
                    return Ok(await _raceService.SearchRacesBySeason((int)seasonId, keyword));
                }
            }
            else
            {
                if (keyword is null)
                {
                    return Ok(await _raceService.GetRacesByUser(userId));
                }
                else
                {
                    return Ok(await _raceService.SearchRacesByUser(userId, keyword));
                }
            }
        }

        [HttpPost]
        public async Task<IActionResult> SignUp([FromQuery] string userId, [FromQuery] int? raceId)
        {
            if (userId is null || raceId is null)
            {
                return BadRequest();
            }

            return Ok(await _raceService.SignUserUp(userId, (int)raceId));
        }
    }
}
