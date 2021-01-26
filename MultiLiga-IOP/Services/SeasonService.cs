using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MultiLiga_IOP.Data;
using MultiLiga_IOP.Models;

namespace MultiLiga_IOP.Services
{
    public class SeasonService : ISeasonService
    {
        ApplicationDbContext _ctx;

        public SeasonService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IList<Season>> GetSeasonsByLeague(int leagueId)
        {
            var result = await _ctx.Seasons
                .Where(s => s.LeagueId == leagueId)
                .ToListAsync();

            return result;
        }

        public async Task<IList<Season>> SearchSeasonsByLeague(int leagueId, string keyword)
        {
            var result = await _ctx.Seasons
                .Where(s => s.LeagueId == leagueId && EF.Functions.Like(s.Name, keyword))
                .ToListAsync();

            return result;
        }
    }
}
