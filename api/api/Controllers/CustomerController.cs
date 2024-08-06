using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CustomerController : ControllerBase
  {
    public static List<Customer> customers = new List<Customer>
        {
            new Customer { Name = "chana", Phone = "03578", Status = 0,Password="111" },
            new Customer { Name = "rachel", Phone = "03578", Status = (Status)1,Password="222" },
            new Customer { Name = "michal", Phone = "03578", Status = 0,Password="333" },



        };
    // GET: api/<CustomerController>
    [HttpGet]
    public IEnumerable<Customer> Get()
    {
      return customers;
    }

    // GET api/<CustomerController>/5
    [HttpGet("{id}")]
    public Customer Get(int id)
    {
      var customerId = customers.Find(i => i.Id == id);
      return customerId;
    }

    // POST api/<CustomerController>
    [HttpPost]
    public void Post([FromBody] Customer value)
    {
      customers.Add(new Customer { Name = value.Name, Phone = value.Phone, Status = value.Status, Password = value.Password });

    }
    // POST api/<CustomerController>
    [HttpPost("login")]
    public IActionResult Login([FromBody] Customer value)
    {
      var c = customers.FindAll(i => i.Name == value.Name);
      if (c is null||c.Count==0)
        return Unauthorized(new { Error = "user" });
      var correct = c.Find(l => l.Password == value.Password);
      if (correct is null)
        return Unauthorized(new { Error = "password" });
      return Ok();
    }
    [HttpPost("register")]
    public IActionResult Register([FromBody] Customer value)
    {
      customers.Add(value);
      return Ok(value);
    }
    // PUT api/<CustomerController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] Customer value)
    {
      var customerId = customers.Find(i => i.Id == id);
      customerId.Name = value.Name;
      customerId.Phone = value.Phone;
      customerId.Status = value.Status;
    }

    // DELETE api/<CustomerController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      var customer = customers.Find(i => i.Id == id);
      customers.Remove(customer);
    }
  }
}
