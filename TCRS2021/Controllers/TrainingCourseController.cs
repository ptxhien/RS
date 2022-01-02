using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TCRS2021.DTO;
using TCRS2021.Service;

namespace TCRS2021.Controllers
{
    public class TrainingCourseController : Controller
    {
        private readonly IUserService _userService;
        private readonly ILogger<TrainingCourseController> _logger;

        public TrainingCourseController(ILogger<TrainingCourseController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        public ReturnObject Get()
        {
            ReturnObject res = new ReturnObject();
            try
            {
                res.value = _userService.GetAll();
                res.statusCode = 200;
                res.message = "Get data thành công";
                return res;
            }
            catch (Exception ex)
            {
                res.statusCode = 500;
                res.message = ex.Message.ToString();
                return res;
            }
        }


    }
}
