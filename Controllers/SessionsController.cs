using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DadsDayApp.Models;
using DadsDayApp.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DadsDayApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        readonly protected string JWT_KEY;
        // Constructor that receives a reference to your database context
        // and stores it in _context_ for you to use in your API methods
        public SessionsController(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            JWT_KEY = config["JWT_KEY"];
        }

        public class LoginUser
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
        [HttpPost]
        public async Task<ActionResult> Login(LoginUser loginUser)
        {
            var foundUser = await _context.Users.FirstOrDefaultAsync(user => user.Email == loginUser.Email);

            if (foundUser != null && foundUser.IsValidPassword(loginUser.Password))
            {
                // create a custom response
                var response = new
                {
                    // This is the login token
                    token = new TokenGenerator(JWT_KEY).TokenFor(foundUser),

                    // The is the user details
                    user = foundUser
                };

                return Ok(response);
            }
            else
            {
                // Make a custom error response
                var response = new
                {
                    status = 400,
                    errors = new List<string>() { "User does not exist" }
                };

                // Return our error with the custom response
                return BadRequest(response);
            }
        }
    }
}