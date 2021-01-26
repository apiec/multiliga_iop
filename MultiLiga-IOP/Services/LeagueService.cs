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

        public async Task<IList<League>> GetLeagues(int? disciplineId)
        {
            var query = _ctx.Leagues.AsQueryable();
            if (disciplineId is object)
            {
                query = query.Where(l => l.DisciplineId == disciplineId);
            }

            return await query.ToListAsync();
        }
    }
}
