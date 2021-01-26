using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Data;
using MultiLiga_IOP.Models;
using Microsoft.EntityFrameworkCore;

namespace MultiLiga_IOP.Services
{
    public class DisciplineService : IDisciplineService
    {
        ApplicationDbContext _ctx;

        public DisciplineService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IList<Discipline>> GetDisciplines()
        {
            return await _ctx.Disciplines.ToListAsync();
        }

        public async Task<IList<Discipline>> SearchDiscipline(string keyword)
        {
            var result = await _ctx.Disciplines
                .Where(d => EF.Functions.Like(d.Name, keyword))
                .ToListAsync();

            return result;
        }
    }
}
