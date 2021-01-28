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
        public async Task<IActionResult> Get([FromQuery] int? disciplineId, [FromQuery] int? leagueId, [FromQuery] int? seasonId, [FromQuery] string userId, [FromQuery] int? raceId)
        {
            try
            {
                if (raceId is object)
                {
                    return Ok(await _raceService.GetRace(raceId));
                }
                else
                {
                    return Ok(await _raceService.GetRaces(disciplineId, leagueId, seasonId, userId));
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] int? raceId)
        {
            if (raceId is null)
            {
                return BadRequest("raceId is null");
            }
            return Ok(await _raceService.GetUsersSignedUpForRace((int)raceId));
        }

        [HttpGet]
        public async Task<IActionResult> GetResults([FromQuery] int? raceId)
        {
            if (raceId is null)
            {
                return BadRequest("raceId is null");
            }
            return Ok(await _raceService.GetResults((int)raceId));
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

        [HttpGet]
        public async Task<IActionResult> IsSignedUp([FromQuery] string userId, [FromQuery] int? raceId)
        {
            if (userId is null || raceId is null)
            {
                return BadRequest();
            }

            try
            {
                var isSignedUp = await _raceService.IsUserSignedUp(userId, (int)raceId);
                return(Ok(new { isSignedUp = isSignedUp }));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SignOut([FromQuery] string userId, [FromQuery] int? raceId)
        {
            if (userId is null || raceId is null)
            {
                return BadRequest();
            }

            var isOk = await _raceService.SignUserOut(userId, (int)raceId);
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
