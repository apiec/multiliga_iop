﻿using System;
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
        

        public async Task<Race> GetRace(int? raceId)
        {
            if (raceId is null)
            {
                return null;
            }

            return await _ctx.Races.FirstOrDefaultAsync(r => r.Id == raceId);
        }


        public async Task<IList<Race>> GetRaces(int? disciplineId, int? leagueId, int? seasonId, string userId)
        {
            var query = _ctx.Races.AsQueryable();

            if (disciplineId is object)
            {
                query = query.Where(r => r.Season.League.DisciplineId == disciplineId);
            }
            if (leagueId is object)
            {
                query = query.Where(r => r.Season.LeagueId == leagueId);
            }
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

        public async Task<IList<RaceResultPoco>> GetResults(int raceId)
        {
            var result = await _ctx.RaceSignUps
                .Where(su => su.RaceId == raceId)
                .Select(su => new RaceResultPoco
                {
                    User = new UserPoco(su.ApplicationUser),
                    Result = su.Result.ToString(@"hh\:mm\:ss")
                })
                .ToListAsync();
            
            return result;
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
