using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultiLiga_IOP.Models
{
    public class League
    {
        public int Id { get; set; }

        public int DisciplineId { get; set; }
        public virtual Discipline Discipline { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        [field: NonSerialized]
        public virtual ICollection<Season> Seasons { get; set; } = new HashSet<Season>();
    }
}
