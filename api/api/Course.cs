using static System.Net.Mime.MediaTypeNames;
using System.Security.Cryptography;

namespace api
{
  public enum LearningType { Frontal, Zoom }
  public class Course
  {
    private static int _id = 0;
    public int Id { get;  }
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public int Lessons { get; set; }
    public DateTime Start { get; set; }
    //public String Silabus { get; set; }
    public List<string> Cilibus { get; set; }

    public int Type { get; set; }
    public int LecturerId { get; set; }
    public string Img { get; set; }
    
    public Course()
    {
      Id = ++_id;
    }

    public Course(int id, string name, int categori, int lessons, DateTime start, int type, int lecturerId, string img,params string[] cilibus) :this()
    {
      Name = name;
      CategoryId = categori;
      Lessons = lessons;
      Start = start;
      Cilibus = cilibus.ToList();
      Type = type;
      LecturerId = lecturerId;
      Img = img;
    }

    public Course(CourseOutModel outModel):this() 
    {
      Name = outModel.Name;
      CategoryId = outModel.Categori;
      Lessons = outModel.Lessons;
      DateTime date;
      DateTime.TryParse(outModel.Start, out date);
      Start = date;
      Cilibus = outModel.Cilibus;
      Type = outModel.Type;
      LecturerId = outModel.LecturerId;
      Img = outModel.Img;
    }
  }
}
