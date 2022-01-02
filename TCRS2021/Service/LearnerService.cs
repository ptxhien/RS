using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TCRS2021.Common;
using TCRS2021.DTO;
using TCRS2021.Models;

namespace TCRS2021.Service
{
    public interface ILearnerService
    {
        List<Learner> GetAll();
        Learner GetById(string id);
    }
    public class LearnerService : ILearnerService
    {
        public TRCSContext _context;
        private readonly JWTSetting _appSettings;


        public LearnerService(TRCSContext context, IOptions<JWTSetting> appSettings)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public List<Learner> GetAll()
        {
            return _context.Learner.ToList();
        }
        public Learner GetById(string id)
        {
            return _context.Learner.FirstOrDefault(x => x.learnerID == id);
        }

        




    }
}
