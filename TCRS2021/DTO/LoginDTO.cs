using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TCRS2021.Models;

namespace TCRS2021.DTO
{
    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class AuthenticateResponse
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(Learner user, string token)
        {
            UserId = user.learnerID;
            Name = user.fullname;
            Email = user.email;
            Token = token;
        }
    }
}
