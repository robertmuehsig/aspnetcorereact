using Microsoft.AspNetCore.Mvc;

namespace NewReactTemplate.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserInfoController : ControllerBase
    {
        private readonly ILogger<UserInfoController> _logger;

        public UserInfoController(ILogger<UserInfoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public UserInfo Get()
        {
            if (User?.Identity?.IsAuthenticated == true)
            {
                return new UserInfo { Name = User.Identity.Name, IsAuthenticated = true };
            }
            else
            {
                return new UserInfo { Name = "Anonymous", IsAuthenticated = false };
            }
        }
    }

}
