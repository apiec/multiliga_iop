using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultiLiga_IOP.Models
{
    public class ApplicationUser : IdentityUser
    {
        [field: NonSerialized]
        public virtual ICollection<RaceSignUp> RaceSignUps { get; set; } = 
            new HashSet<RaceSignUp>();

    }
}
