using Conny.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace Conny.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
        
    }
}