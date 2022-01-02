using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TCRS2021.Models
{
    public class Offlinecourse
    {
        public string courseID { get; set; }
        public string courseTitle { get; set; }
        public string URL { get; set; }
        public string outcomeLearning { get; set; }
        public string subject { get; set; }
        public string location { get; set; }
        public string provider { get; set; }
        public string studyForm { get; set; }
        public string duration { get; set; }
        public int feeVND { get; set; }
        public string studyTime { get; set; }
        public string technologySkill { get; set; }
        public string level { get; set; }
        public string language { get; set; }
        public int languagedurationSecond { get; set; }
    }
}
