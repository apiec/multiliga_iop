using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MultiLiga_IOP.Models;


namespace MultiLiga_IOP.POCOs
{
    public class UserPoco
    {
        public UserPoco(ApplicationUser user) 
        {
            UserName = user.UserName;
        }

        public string Id { get; set; }
        public string UserName { get; set; }

    }
}
