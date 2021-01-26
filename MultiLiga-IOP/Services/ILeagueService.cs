using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Models;


namespace MultiLiga_IOP.Services
{
    public interface ILeagueService
    {
        Task<IList<League>> GetLeagues(int? disciplineId);
    }
}
