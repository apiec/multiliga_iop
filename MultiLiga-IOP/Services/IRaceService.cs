using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Models;

namespace MultiLiga_IOP.Services
{
    public interface IRaceService
    {
        public Task<IList<Race>> GetRacesBySeason(int seasonId);
        public Task<IList<Race>> GetRacesByUser(string userId);
        public Task<IList<Race>> SearchRacesBySeason(int seasonId, string keyword);
        public Task<IList<Race>> SearchRacesByUser(string userId, string keyword);

        public Task<bool> SignUserUp(string userId, int raceId);

    }
}
