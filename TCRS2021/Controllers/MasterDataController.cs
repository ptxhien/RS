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
    public class MasterDataController : Controller
    {
        private IMasterDataService _masterDataService;

        public MasterDataController(IMasterDataService masterDataService)
        {
            _masterDataService = masterDataService;
        }

        [HttpGet("GetAllLanguage")]
        public ReturnObject GetAllLearner()
        {
            ReturnObject res = new ReturnObject();
            try
            {
                res.value = _masterDataService.GetAllLanguage();
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

        [HttpGet("GetAllTechnology")]
        public ReturnObject GetAllTechnology()
        {
            ReturnObject res = new ReturnObject();
            try
            {
                res.value = _masterDataService.GetAllTechnology();
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

        [HttpGet("GetFreeTime")]
        public ReturnObject GetFreeTime()
        {
            ReturnObject res = new ReturnObject();
            try
            {
                res.value = _masterDataService.GetFreeTime();
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

        [HttpGet("GetJob")]
        public ReturnObject GetJob()
        {
            ReturnObject res = new ReturnObject();
            try
            {
                res.value = _masterDataService.GetJob();
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

