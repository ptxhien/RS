using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TCRS2021.Helpers;
using TCRS2021.Service;

namespace TCRS2021.Controllers
{
    public class HomeController : Controller
    {
        private readonly IUserService _userService;
        private readonly ILogger<AuthenticationController> _logger;

        public HomeController(ILogger<AuthenticationController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
