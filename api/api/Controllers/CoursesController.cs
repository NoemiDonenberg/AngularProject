using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        public static List<Course> courses = new List<Course>
        {
            new Course {Name="excel",CategoryId=2, Lessons=30,Start=new DateTime(2024,3,17),Cilibus=new List<string>{"fedf","dwqd","dqef","deqwd"},Type=(int)LearningType.Frontal,LecturerId=1011,Img="excel.jpg" },
            new Course {Name="HTML",CategoryId=5, Lessons=10,Start=new DateTime(2024,3,17),Cilibus=new List<string>{"fedf","dwqd","dqef","deqwd"},Type=(int)LearningType.Frontal,LecturerId=1213,Img= "HTML.jpg" },
            new Course {Name="illustrator",CategoryId=6, Lessons=18,Start=new DateTime(2024,3,17),Cilibus=new List<string>{"fedf","dwqd","dqef","deqwd"},Type=(int)LearningType.Frontal,LecturerId=1415 , Img = "illustrator.jpg"},
        };
        // GET: api/<CoursesController>
        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return courses;
        }

        // GET api/<CoursesController>/5
        [HttpGet("{id}")]
        public Course Get(int id)
        {
            var course = courses.Find(i => i.Id == id);
            return course;
        }
        // POST api/<CustomerController>
        [HttpPost]
        public IActionResult Post([FromBody] CourseOutModel value)
        {

            courses.Add(new Course(value));
            return Ok(value);
            //Course course = new Course { Id = value.Id, Name = value.Name, Categori = value.Categori, Lessons = value.Lessons, Start = value.Start, Silabus = value.Silabus, Type = value.Type };
            //courses.Add(course);
            //return course;
        }


        // PUT api/<CoursesController>/5
        [HttpPut("{id}")]
        public Course Put(int id, [FromBody] Course value)
        {
            var course = courses.Find(i => i.Id == id);
            var i = courses.FindIndex(i => i.Id == id);
            course.Name = value.Name;
            course.CategoryId = value.CategoryId;
            course.Start = value.Start;
            course.Img = value.Img;
            course.Type = value.Type;
            course.LecturerId = value.LecturerId;
            course.Lessons = value.Lessons;
            
            course.Cilibus = new List<string>();
            value.Cilibus.ForEach(c =>
            {
                course.Cilibus.Add(c);
            });

            return course;
        }

        // DELETE api/<CoursesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var course = courses.Find(i => i.Id == id);
            courses.Remove(course);
        }
    }
}
