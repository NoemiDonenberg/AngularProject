namespace api
{
  public enum Status { Student, Lecturer }

  public class Customer
  {
    static private int _id = 0;
    public int Id { get; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public Status Status { get; set; }
    public string Password { get; set; }
    public Customer()
    {
      Id = ++_id;
    }

    public Customer(int id, string name, string phone, string address, string email, Status status, string password) : this()
    {
      Name = name;
      Phone = phone;
      Address = address;
      Email = email;
      Status = status;
      Password = password;
    }
  }
}
