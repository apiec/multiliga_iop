using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Models;

namespace MultiLiga_IOP.Services
{
    public interface ISeasonService
    {
        Task<IList<Season>> GetSeasonsByLeague(int? leagueId);
    }
}
