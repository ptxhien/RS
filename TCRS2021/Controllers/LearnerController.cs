using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TCRS2021.DTO;
using TCRS2021.Service;

namespace TCRS2021.Controllers
{
    [Route("api/[controller]")]
    public class LearnerController : Controller
    {
        private ILearnerService _learnerService;

        public LearnerController(ILearnerService learnerService)
        {
            _learnerService = learnerService;
        }

        [HttpGet("GetAllLearner")]
        public ReturnObject GetAllLearner()
        {
            ReturnObject res = new ReturnObject();
            try
            {
                res.value = _learnerService.GetAll();
                if (res.value == null)
                {
                    res.statusCode = 400;
                    res.message = "Đăng nhập không thành công";
                }
                else
                {
                    res.statusCode = 200;
                    res.message = "Success";
                }
            }
            catch (Exception ex)
            {
                res.statusCode = 400;
                res.message = "Failure";
            }
            return res;
        }
    }
}
