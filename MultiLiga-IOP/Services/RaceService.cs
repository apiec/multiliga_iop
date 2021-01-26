using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Models;
using MultiLiga_IOP.Data;
using Microsoft.EntityFrameworkCore;

namespace MultiLiga_IOP.Services
{
    public class RaceService : IRaceService
    {
        ApplicationDbContext _ctx;

        public RaceService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IList<Race>> GetRacesBySeason(int seasonId)
        {
            var result = await _ctx.Races
                .Where(r => r.SeasonId == seasonId)
                .ToListAsync();

            return result;
        }

        public async Task<IList<Race>> GetRacesByUser(string userId)
        {
            var result = await _ctx.Races
                .Where(r => 
                    r.SignUps.Any(su => su.ApplicationUserId == userId))
                .ToListAsync();

            return result;
        }

        public async Task<IList<Race>> SearchRacesBySeason(int seasonId, string keyword)
        {
            var result = await _ctx.Races
                .Where(r => r.SeasonId == seasonId && EF.Functions.Like(r.Name, keyword))
                .ToListAsync();

            return result;
        }

        public async Task<IList<Race>> SearchRacesByUser(string userId, string keyword)
        {
            var result = await _ctx.Races
                .Where(r =>
                    r.SignUps.Any(su => su.ApplicationUserId == userId) &&
                    EF.Functions.Like(r.Name, keyword))
                .ToListAsync();

            return result;
        }

        public async Task<bool> SignUserUp(string userId, int raceId)
        {
            var user = await _ctx.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null)
            {
                return false;
            }

            var race = await _ctx.Races.FirstOrDefaultAsync(r => r.Id == raceId);
            if (race is null)
            {
                return false;
            }

            try
            {
                await _ctx.RaceSignUps.AddAsync(new RaceSignUp
                {
                    ApplicationUserId = userId,
                    RaceId = raceId
                });
                await _ctx.SaveChangesAsync();
                return true;
            } 
            catch (Exception)
            {
                return false;
            }
        }
    }
}
