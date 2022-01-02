using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TCRS2021.DTO;
using TCRS2021.Models;
using TCRS2021.Service;

namespace TCRS2021.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IUserService _userService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(ILogger<AuthenticationController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost("Login")]
        public ReturnObject Login([FromBody] LoginDTO loginData)
        {
            ReturnObject res = new ReturnObject();
            try
            {
                res.value = _userService.Authenticate(loginData.Email, loginData.Password);
                if (res.value == null)
                {
                    res.statusCode = 400;
                    res.message = "Đăng nhập không thành công";
                }
                else
                {
                    res.statusCode = 200;
                    res.message = "Đăng nhập thành công";
                }
            }
            catch (Exception ex)
            {
                res.statusCode = 400;
                res.message = "Đăng nhập không thành công";
            }
            return res;
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ReturnObject Register(RegisterDTO registerDTO)
        {
            ReturnObject res = new ReturnObject();
            try
            {
                res.value = _userService.Create(registerDTO);
                res.statusCode = 200;
                res.message = "Đăng ký thành công";
                return res;
            }
            catch (Exception ex)
            {
                res.statusCode = 500;
                res.message = ex.Message.ToString();
                return res;
            }
        }

        [HttpPost]
        [HttpPost("RegisterLearner")]
        public ReturnObject RegisterLearner([FromBody]RegisterLearnerDTO registerDTO)
        {
            ReturnObject res = new ReturnObject();
            try
            {
                res.value = _userService.RegisterLearner(registerDTO);
                if(res.value == true)
                {
                    res.statusCode = 200;
                    res.message = "SUCCESS";
                }
                else
                {
                    res.statusCode = 400;
                    res.message = "FAILURE";
                } 
                return res;
            }
            catch (Exception ex)
            {
                res.statusCode = 500;
                res.message = ex.Message.ToString();
                return res;
            }
        }

        //[HttpPost]
        //public ReturnObject Register(RegisterLearnerDTO registerDTO)
        //{
        //    ReturnObject res = new ReturnObject();
        //    try
        //    {
        //        res.value = _userService.Create(registerDTO);
        //        res.statusCode = 200;
        //        res.message = "Đăng ký thành công";
        //        return res;
        //    }
        //    catch (Exception ex)
        //    {
        //        res.statusCode = 500;
        //        res.message = ex.Message.ToString();
        //        return res;
        //    }
        //}

        //[HttpPost]
        //public ReturnObject Login(RegisterDTO registerDTO)
        //{
        //    ReturnObject res = new ReturnObject();
        //    try
        //    {
        //        res.value = _userService.Authenticate(registerDTO.Email, registerDTO.Password);
        //        res.statusCode = 200;
        //        res.message = "Đăng ký thành công";
        //        return res;
        //    }
        //    catch (Exception ex)
        //    {
        //        res.statusCode = 500;
        //        res.message = ex.Message.ToString();
        //        return res;
        //    }
        //}

        [Authorize]
        public ReturnObject Get()
        {
            ReturnObject res = new ReturnObject();
            try
            {
                res.value = _userService.GetAll();
                res.statusCode = 200;
                res.message = "Đăng ký thành công";
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
