using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LecturerController : ControllerBase
  {
    public static List<Lecturer> lecturers = new()
    {
            new Lecturer { Name = "chana", Phone = "03578", Status = 0,Password="111" },
            new Lecturer { Name = "rachel", Phone = "03578", Status = (Status)1,Password="222" },
            new Lecturer { Name = "michal", Phone = "03578", Status = 0,Password="333" },
            new Lecturer { Name = "ddd", Phone = "03578", Status = 0,Password="555" },



        };
    // GET: api/<LecturerController>
    [HttpGet]
    public IEnumerable<Lecturer> Get()
    {
      return lecturers;
    }

    // GET api/<LecturerController>/5
    [HttpGet("{id}")]
    public Lecturer Get(int id)
    {
      var lecturerId = lecturers.Find(i => i.Id == id);
      return lecturerId;
    }

    // POST api/<LecturerController>
    [HttpPost]
    public void Post([FromBody] Lecturer value)
    {
      lecturers.Add(new Lecturer { Name = value.Name, Phone = value.Phone, Status = value.Status, Password = value.Password });

    }
    // POST api/<LecturerController>
    [HttpPost("login")]
    public IActionResult Login([FromBody] Lecturer value)
    {
      var c = lecturers.FindAll(i => i.Name == value.Name);
      if (c is null || c.Count == 0)
        return Unauthorized(new { Error = "user" });
      var correct = c.Find(l => l.Password == value.Password);
      if (correct is null)
        return Unauthorized(new { Error = "password" });
      return Ok();
    }
    [HttpPost("register")]
    public IActionResult Register([FromBody] Lecturer value)
    {
      lecturers.Add(value);
      return Ok(value);
    }
    // PUT api/<LecturerController>/5
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Lecturer value)
    {
      var lecturerId = lecturers.Find(i => i.Id == id);
      if(lecturerId is null)
        return NotFound();
      lecturerId.Name = value.Name;
      lecturerId.Phone = value.Phone;
      lecturerId.Status = value.Status;
      return Ok(lecturerId);
    }

    // DELETE api/<LecturerController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      var lecturer = lecturers.Find(i => i.Id == id);
      lecturers.Remove(lecturer);
    }
  }
}
