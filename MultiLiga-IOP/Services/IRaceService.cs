using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Models;
using MultiLiga_IOP.POCOs;

namespace MultiLiga_IOP.Services
{
    public interface IRaceService
    {
        Task<IList<Race>> GetRaces(int? disciplineId, int? leagueId, int? seasonId, string userId);
        Task<IList<UserPoco>> GetUsersSignedUpForRace(int raceId);
        Task<bool> SignUserUp(string userId, int raceId);

    }
}
