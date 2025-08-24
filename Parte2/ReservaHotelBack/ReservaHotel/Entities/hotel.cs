namespace ReservaHotel.Entities
{
    public class Hotel
    {
        public string Name { get; set; } = string.Empty;
        public string Uri { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string? City { get; set; }          
        public string? Country { get; set; }       
        public string? Description { get; set; }   
        public string? Thumbnail { get; set; }    
        public string? Homepage { get; set; }    
    }
}
