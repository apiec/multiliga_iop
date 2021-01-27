﻿using System;
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

        public async Task<IList<Season>> GetSeasons(int? disciplineId, int? leagueId)
        {
            var query = _ctx.Seasons.AsQueryable();

            if (disciplineId is object)
            {
                query = query.Where(s => s.League.DisciplineId == leagueId);
            }

            if (leagueId is object)
            {
                query = query.Where(s => s.LeagueId == leagueId);
            }

            return await query.ToListAsync();
        }
    }
}
