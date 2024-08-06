using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        public static List<Category> categories = new()
        {
            new Category {Name="mathmatic"},
            new Category {Name="camputers"},
            new Category {Name="dance"},
            new Category {Name="gym"},
            new Category {Name="lanuages"},
            new Category {Name="graphics"},
        };

        // GET: api/<CategoriesController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(categories);
        }

    }
}
