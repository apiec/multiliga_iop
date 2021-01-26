using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultiLiga_IOP.Models
{
    public class Race
    {
        public int Id { get; set; }

        public int SeasonId { get; set; }
        [field: NonSerialized]
        public Season Season { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }

        public int RouteDetailsId { get; set; }
        [field: NonSerialized]
        public virtual RouteDetails RouteDetails { get; set; }
        
        [field: NonSerialized]
        public virtual ICollection<RaceSignUp> SignUps { get; set; } = new HashSet<RaceSignUp>();
    }
}
