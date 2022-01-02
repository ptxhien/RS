using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TCRS2021.Models
{
    public class UserInfo
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool Active { get; set; }
        public DateTime? CreatedDate { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
