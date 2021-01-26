using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultiLiga_IOP.Models
{
    public class Season
    {
        public int Id { get; set; }

        public int LeagueId { get; set; }
        public virtual League League { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        
        [field: NonSerialized]
        public virtual ICollection<Race> Races { get; set; } = new HashSet<Race>();
    }
}
