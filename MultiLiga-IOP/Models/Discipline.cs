using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultiLiga_IOP.Models
{
    [Serializable]
    public class Discipline
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [field: NonSerialized]
        public virtual ICollection<League> Leagues { get; set; } = new HashSet<League>();
    }
}
