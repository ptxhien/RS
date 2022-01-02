using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TCRS2021.DTO
{
    public class RegisterLearnerDTO
    {
        public string email { get; set; }
        public string password { get; set; }
        public string fullname { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string gender { get; set; }
        public string learnerLevel { get; set; }
        public string language { get; set; }
        public string jobNow { get; set; }
        public string technologySkill { get; set; }
        public string feeMax { get; set; }
        public string freeTime { get; set; }
    }
}
