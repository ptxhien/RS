using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TCRS2021.Common;
using TCRS2021.DTO;
using TCRS2021.Models;

namespace TCRS2021.Service
{
    public interface IUserService
    {
        List<UserInfo> GetAll();
        UserInfo Create(RegisterDTO req);
        AuthenticateResponse Authenticate(string email, string password);
        string GenerateJSONWebToken(Learner userInfo);
        UserInfo GetById(string id);
        bool RegisterLearner(RegisterLearnerDTO registerLearnerDTO);
    }
    public class UserService : IUserService
    {
        public TRCSContext _context;
        private readonly JWTSetting _appSettings;
        public ILearnerService _learnerService;

        public UserService(TRCSContext context, IOptions<JWTSetting> appSettings, ILearnerService learnerService)
        {
            _appSettings = appSettings.Value;
            _context = context;
            _learnerService = learnerService;
        }

        public List<UserInfo> GetAll()
        {
            return _context.UserInfo.ToList();
        }

        public AuthenticateResponse Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Learner.FirstOrDefault(x => x.email == email);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.passwordHash, user.passwordSalt))
                return null;

            var token = GenerateJSONWebToken(user);
            // authentication successful
            return new AuthenticateResponse(user, token);
        }



        public UserInfo Create(RegisterDTO req)
        {
            UserInfo user = new UserInfo();
            user.UserId = Guid.NewGuid().ToString();
            user.Name = req.Name;
            user.Email = req.Email;
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(req.Password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.UserInfo.Add(user);
            _context.SaveChanges();

            return user;
        }

        public bool RegisterLearner(RegisterLearnerDTO registerLearnerDTO)
        {
            Learner entity = new Learner();
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(registerLearnerDTO.password, out passwordHash, out passwordSalt);

            entity.learnerID = Guid.NewGuid().ToString();
            entity.email = registerLearnerDTO.email;
            entity.passwordHash = passwordHash;
            entity.passwordSalt = passwordSalt;
            entity.fullname = registerLearnerDTO.fullname;
            entity.phone = registerLearnerDTO.phone;
            entity.address = registerLearnerDTO.address;
            entity.gender = registerLearnerDTO.gender;
            entity.learnerLevel = registerLearnerDTO.learnerLevel;
            entity.language = registerLearnerDTO.language;
            entity.technologySkill = registerLearnerDTO.technologySkill;
            entity.jobNow = registerLearnerDTO.jobNow;
            entity.feeMax = registerLearnerDTO.feeMax;
            entity.freeTime = registerLearnerDTO.freeTime;
            _context.Learner.Add(entity);
            _context.SaveChanges();
            return true;
        }


        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public string GenerateJSONWebToken(Learner userInfo)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            if (userInfo != null)
            {
                IdentityOptions _options = new IdentityOptions();
                //create claims details based on the user information
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _appSettings.Subject),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Id", userInfo.learnerID.ToString()),
                    new Claim("UserName", userInfo.fullname),
                    new Claim("Email", userInfo.email),
                    new Claim("Role", "Guest"),
                    new Claim(_options.ClaimsIdentity.UserNameClaimType, userInfo.learnerID +"-"+ userInfo.fullname),
                    new Claim(_options.ClaimsIdentity.RoleClaimType, "Guest")
                   };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Key));

                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(_appSettings.Issuer, _appSettings.Audience, claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);

                return tokenHandler.WriteToken(token);
            }
            else
            {
                return null;
            }
        }

        public UserInfo GetById(string id)
        {
            return _context.UserInfo.FirstOrDefault(x => x.UserId == id);
        }

    }
}
