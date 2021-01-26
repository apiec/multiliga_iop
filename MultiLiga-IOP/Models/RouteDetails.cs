using System.Collections.Generic;

namespace MultiLiga_IOP.Models
{
    public class RouteDetails
    {
        public int Id { get; set; }

        public int Name { get; set; }
        public string Description { get; set; }
        public ICollection<Race> Races { get; set; } = new HashSet<Race>();
    }
}