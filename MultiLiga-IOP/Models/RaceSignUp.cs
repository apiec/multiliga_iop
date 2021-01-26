using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultiLiga_IOP.Models
{
    public class RaceSignUp
    {
        public string ApplicationUserId { get; set; }
        [field: NonSerialized]
        public virtual ApplicationUser ApplicationUser { get; set; }

        public int RaceId { get; set; }
        [field: NonSerialized]
        public virtual Race Race { get; set; }

        public TimeSpan RaceTime { get; set; }
        public bool ShowedUp { get; set; }
    }
}
