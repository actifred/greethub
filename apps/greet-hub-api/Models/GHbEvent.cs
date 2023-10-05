using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GreetHubApi.Models
{
    /// <summary>
    /// GreetHub Event
    /// </summary>
    public class GHbEventModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string LocalTimeZoneId { get; set; }
        public DateTime UtcStartTime { get; set; }
        public DateTime UtcEndTime { get; set; }
        public bool IsApproved { get; set; }
    }
}
