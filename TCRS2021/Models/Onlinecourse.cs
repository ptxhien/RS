using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TCRS2021.Models
{
    public class Onlinecourse
    {
        public string courseID { get; set; }
        public string courseTitle { get; set; }
        public string URL { get; set; }
        public string outcomeLearning { get; set; }
        public string provider { get; set; }
        public string technologySkill { get; set; }
        public decimal rating { get; set; }
        public int peopleRating { get; set; }
        public int numStudent { get; set; }
        public int durationSecond { get; set; }
        public int fee { get; set; }
        public int feeVND { get; set; }
        public string duration { get; set; }
        public string level { get; set; }
        public string majorSubject { get; set; }
        public string language { get; set; }
    }
}
