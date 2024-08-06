namespace api
{
    public class Category
    {
        static private int _id = 0;

        public int Id { get; }
        public string Name { get; set; }
        public string Img { get; set; }
        public Category()
        {
            Id = ++_id;
        }
        public Category(int id, string name, string img) : this()
        {
            Name = name;
            Img = img;
        }
    }
}
