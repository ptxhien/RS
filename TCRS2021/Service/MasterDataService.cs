using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TCRS2021.Common;
using TCRS2021.Models;

namespace TCRS2021.Service
{
    public interface IMasterDataService
    {
        List<Language> GetAllLanguage();
        List<Technology> GetAllTechnology();
        List<dynamic> GetFreeTime();
        List<dynamic> GetJob();
    }
    public class MasterDataService : IMasterDataService
    {
        public TRCSContext _context;
        private readonly JWTSetting _appSettings;


        public MasterDataService(TRCSContext context, IOptions<JWTSetting> appSettings)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public List<Language> GetAllLanguage()
        {
            return _context.Language.ToList();
        }

        public List<Technology> GetAllTechnology()
        {
            return _context.Technology.ToList();
        }

        public List<dynamic> GetFreeTime()
        {
            List<dynamic> resVall = new List<dynamic>();
            List<string> res = new List<string>();
            var time = _context.Offlinecourse.Select(p => p.studyTime).ToList();
            foreach (var item in time)
            {
                var str = item.Split('|').ToList();
                res.AddRange(str);
            }
            foreach (var item in res)
            {
                string temp = "";
                temp = item.Replace(",", " -");
                dynamic obj = new
                {
                    Name = temp,
                    Value = temp
                };
                resVall.Add(obj);
            }
            return resVall;
        }

        public List<dynamic> GetJob()
        {
            List<dynamic> res = new List<dynamic>();
            var lsTitle = _context.Job.ToList();
            foreach (var item in lsTitle)
            {
                dynamic obj = new
                {
                    Name = item.jobTitle,
                    Value = item.jobID
                };
                res.Add(obj);
            }
            return res;
        }
    }
}
