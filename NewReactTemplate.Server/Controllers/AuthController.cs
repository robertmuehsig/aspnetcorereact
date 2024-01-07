using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace NewReactTemplate.Server.Controllers
{
    [Route("[controller]")]
    public class AuthController : Controller
    {
        [HttpGet("Login")]
        public async Task<IActionResult> Login()
        {
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, "TestUser"),
            // You can add more claims here if needed
        };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            return View("Callback");
        }

        [HttpGet("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();

            return View("Callback");
        }

    }

}
