namespace api
{
  public class CourseOutModel
  {
    private static int _id = 0;
    public int Id { get; }
    public string Name { get; set; }
    public int Categori { get; set; }
    public int Lessons { get; set; }
    public string Start { get; set; }
    public int Type { get; set; }
    public List<string> Cilibus { get; set; }
    public int LecturerId { get; set; }
    public string Img { get; set; }

    public CourseOutModel(string name, int categori, int lessons, string start, List<string> cilibus, int type, int lecturerId, string img)
    {
      Id = ++_id;
      Name = name;
      Categori = categori;
      Lessons = lessons;
      Start = start;
      Cilibus = cilibus;
      LecturerId = lecturerId;
      Img = img;
    }
  }
}
