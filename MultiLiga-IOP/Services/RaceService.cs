using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Models;
using MultiLiga_IOP.Data;
using Microsoft.EntityFrameworkCore;
using MultiLiga_IOP.POCOs;

namespace MultiLiga_IOP.Services
{
    public class RaceService : IRaceService
    {
        ApplicationDbContext _ctx;

        public RaceService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IList<Race>> GetRaces(int? seasonId, string userId)
        {
            var query = _ctx.Races.AsQueryable();
            if (seasonId is object)
            {
                query = query.Where(r => r.SeasonId == seasonId);
            }
            if (userId is object)
            {
                query = query.Where(r => 
                    r.SignUps.Any(s => s.ApplicationUserId == userId));
            }

            return await query.ToListAsync();
        }

        public async Task<IList<UserPoco>> GetUsersSignedUpForRace(int raceId)
        {
            var result = await _ctx.Users
                .Where(u => u.RaceSignUps.Any(su => su.RaceId == raceId))
                .Select(u => new UserPoco(u))
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
