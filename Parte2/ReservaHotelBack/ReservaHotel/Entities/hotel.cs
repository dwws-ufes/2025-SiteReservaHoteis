namespace ReservaHotel.Entities
{
    public class Hotel
{
    public string Name { get; set; } = "";
    public string Uri { get; set; } = "";
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    public string? City { get; set; }
    public string? Country { get; set; }
    public string? Thumbnail { get; set; }
}
}
