using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Data;
using MultiLiga_IOP.Models;
using Microsoft.EntityFrameworkCore;

namespace MultiLiga_IOP.Services
{
    public class LeagueService : ILeagueService
    {
        ApplicationDbContext _ctx;

        public LeagueService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IList<League>> GetLeagues(int disciplineId)
        {
            var leagues = _ctx.Leagues
                .Where(l => l.DisciplineId == disciplineId)
                .ToList();

            return leagues;
        }

        public async Task<IList<League>> SearchLeagues(int disciplineId, string keyword)
        {
            var result = _ctx.Leagues
                .Where(l => 
                    l.DisciplineId == disciplineId && 
                    EF.Functions.Like(l.Name, keyword))
                .ToList();

            return result;
        }
    }
}
