using System.Text.Json;
using System.Text.Json.Serialization;
using VDS.RDF;
using VDS.RDF.Writing;

// Ajuste o namespace conforme seu projeto
namespace ReservaHotel.LinkedData
{
    // “DTO-like” mínimo para evitar dependência direta do seu DTO real
    public interface IBookingLike
    {
        int Id { get; }
        DateTime CheckIn { get; }
        DateTime CheckOut { get; }
        float Price { get; }
        int RoomQtd { get; }
        int AdultsNumber { get; }
        int ChildNumber { get; }
        int RoomId { get; }
        Guid UserId { get; }
    }

    public static class BookingLinkedDataBuilder
    {
        // troque para o seu domínio público se tiver
        private static readonly Uri Base = new("https://localhost:5058/");
        private static readonly Uri BookBase = new(Base, "booking/");
        private static readonly Uri RoomBase = new(Base, "room/");

        private static readonly Uri XsdDecimal = new("http://www.w3.org/2001/XMLSchema#decimal");
        private static readonly Uri XsdDateTime = new("http://www.w3.org/2001/XMLSchema#dateTime");

        // ===== JSON-LD =====
        public static string ToJsonLd(IEnumerable<IBookingLike> bookings)
        {
            var graph = bookings.Select(b => new
            {
                @id = new Uri(BookBase, b.Id.ToString()).ToString(),
                @type = "Reservation",
                reservationNumber = $"B-{b.Id}",
                underName = new { @type = "Person", identifier = b.UserId.ToString() },
                reservationFor = new
                {
                    @id = new Uri(RoomBase, b.RoomId.ToString()).ToString(),
                    @type = "Room",
                    name = $"Room {b.RoomId}"
                },
                checkinTime = b.CheckIn.ToString("o"),
                checkoutTime = b.CheckOut.ToString("o"),
                totalPrice = b.Price,
                numAdults = b.AdultsNumber,
                numChildren = b.ChildNumber,
                numRooms = b.RoomQtd,
                reservationStatus = "Confirmed"
            });

            var wrapper = new
            {
                @context = "https://schema.org/",
                @graph = graph
            };

            return JsonSerializer.Serialize(
                wrapper,
                new JsonSerializerOptions { WriteIndented = true, DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull }
            );
        }

        public static string ToJsonLd(IBookingLike booking) => ToJsonLd(new[] { booking });

        // ===== Turtle (dotNetRDF) =====
        public static string ToTurtle(IEnumerable<IBookingLike> bookings)
        {
            var g = NewGraph();
            foreach (var b in bookings) AddBooking(g, b);
            return WriteTurtle(g);
        }

        public static string ToTurtle(IBookingLike booking) => ToTurtle(new[] { booking });

        // ===== Helpers =====
        private static IGraph NewGraph()
        {
            var g = new Graph();
            g.NamespaceMap.AddNamespace("schema", new Uri("https://schema.org/"));
            g.NamespaceMap.AddNamespace("rdfs",   new Uri("http://www.w3.org/2000/01/rdf-schema#"));
            g.NamespaceMap.AddNamespace("xsd",    new Uri("http://www.w3.org/2001/XMLSchema#"));
            return g;
        }

        private static void AddBooking(IGraph g, IBookingLike b)
        {
            var s = g.CreateUriNode(new Uri(BookBase, b.Id.ToString()));
            var room = g.CreateUriNode(new Uri(RoomBase, b.RoomId.ToString()));

            g.Assert(s, g.CreateUriNode("rdf:type"), g.CreateUriNode("schema:Reservation"));
            g.Assert(s, g.CreateUriNode("schema:reservationNumber"), g.CreateLiteralNode($"B-{b.Id}"));

            // underName (Person) como nó em branco
            var person = g.CreateBlankNode();
            g.Assert(person, g.CreateUriNode("rdf:type"), g.CreateUriNode("schema:Person"));
            g.Assert(person, g.CreateUriNode("schema:identifier"), g.CreateLiteralNode(b.UserId.ToString()));
            g.Assert(s, g.CreateUriNode("schema:underName"), person);

            // reservationFor → Room
            g.Assert(room, g.CreateUriNode("rdf:type"), g.CreateUriNode("schema:Room"));
            g.Assert(room, g.CreateUriNode("rdfs:label"), g.CreateLiteralNode($"Room {b.RoomId}"));
            g.Assert(s, g.CreateUriNode("schema:reservationFor"), room);

            // datas e números
            g.Assert(s, g.CreateUriNode("schema:checkinTime"),  g.CreateLiteralNode(b.CheckIn.ToString("o"), XsdDateTime));
            g.Assert(s, g.CreateUriNode("schema:checkoutTime"), g.CreateLiteralNode(b.CheckOut.ToString("o"), XsdDateTime));
            g.Assert(s, g.CreateUriNode("schema:totalPrice"),   g.CreateLiteralNode(b.Price.ToString(System.Globalization.CultureInfo.InvariantCulture), XsdDecimal));
            g.Assert(s, g.CreateUriNode("schema:numberOfItems"), g.CreateLiteralNode(b.RoomQtd.ToString())); // n° de quartos
            g.Assert(s, g.CreateUriNode("schema:numAdults"),     g.CreateLiteralNode(b.AdultsNumber.ToString()));
            g.Assert(s, g.CreateUriNode("schema:numChildren"),   g.CreateLiteralNode(b.ChildNumber.ToString()));
        }

        private static string WriteTurtle(IGraph g)
        {
            var writer = new VDS.RDF.Writing.CompressingTurtleWriter();
            using var sw = new System.IO.StringWriter(); 
            writer.Save(g, sw);
            return sw.ToString();
        }
    }
}
