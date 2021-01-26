using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
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

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int? seasonId, [FromQuery] string userId)
        {
            return Ok(await _raceService.GetRaces(seasonId, userId));
        }

        [HttpGet("getusers")]
        public async Task<IActionResult> GetUsers([FromQuery] int? raceId)
        {
            if (raceId is null)
            {
                return BadRequest("raceId is null");
            }
            return Ok(await _raceService.GetUsersSignedUpForRace((int)raceId));
        }

        [HttpPost]
        public async Task<IActionResult> SignUp([FromQuery] string userId, [FromQuery] int? raceId)
        {
            if (userId is null || raceId is null)
            {
                return BadRequest();
            }

            var isOk = await _raceService.SignUserUp(userId, (int)raceId);
            if (isOk)
            {
                return Ok();
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
