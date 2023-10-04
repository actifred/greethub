using System.Collections.Generic;
using GreetHubApi.DTOs;

namespace GreetHubApi.Services
{
    public interface IGHbEventProviderService
    {
        IEnumerable<GHbEvent> Get();
        GHbEvent Add(GHbEvent ghbEvent);
    }
    public class GHbEventProviderService : IGHbEventProviderService
    {
        private List<GHbEvent> _ghbEvents = new();

        public IEnumerable<GHbEvent> Get()
        {
            return _ghbEvents;
        }

        public GHbEvent Add(GHbEvent ghbEvent) {
            _ghbEvents.Add(ghbEvent);
            return ghbEvent;
        }
    }
}
