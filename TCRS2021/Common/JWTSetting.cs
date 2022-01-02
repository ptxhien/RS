using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TCRS2021.Common
{
    public class JWTSetting
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Subject { get; set; }
    }
}
