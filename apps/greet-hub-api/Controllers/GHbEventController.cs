using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GreetHubApi.DTOs;
using GreetHubApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GreetHubApi.Controllers
{
    [ApiController]
    [Route("event")]
    public class GHbEventController : ControllerBase
    {
        private readonly ILogger<GHbEventController> _logger;
        private readonly IGHbEventProviderService _eventProviderService;

        public GHbEventController(
            ILogger<GHbEventController> logger,
            IGHbEventProviderService eventProviderService
        ) {
            _logger = logger;
            _eventProviderService = eventProviderService;
        }

        [HttpGet]
        public IEnumerable<GHbEvent> Get()
        {
            var events = _eventProviderService.Get();
            return events;
        }
        
        [HttpPost]
        public GHbEvent Add(GHbEvent ghbEvent)
        {
            return _eventProviderService.Add(ghbEvent);
        }
    }
}
