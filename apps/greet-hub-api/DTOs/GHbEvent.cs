using System;

namespace GreetHubApi.DTOs
{
    /// <summary>
    /// GreetHub Event
    /// </summary>
    public class GHbEvent
    {
        public string Id { get; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string LocalTimeZoneId { get; set; }
        public DateTime UtcStartTime { get; set; }
        public DateTime UtcEndTime { get; set; }
    }
}
