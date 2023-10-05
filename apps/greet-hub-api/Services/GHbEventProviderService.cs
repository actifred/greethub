using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GreetHubApi.DTOs;
using GreetHubApi.Models;
using Microsoft.Extensions.Logging;

namespace GreetHubApi.Services
{
    public interface IGHbEventProviderService
    {
        Task<List<GHbEvent>> GetAsync();
        Task<GHbEvent> Add(GHbEvent ghbEvent);
    }
    public class GHbEventProviderService : IGHbEventProviderService
    {
        private readonly ILogger<GHbEventProviderService> _logger;

        private readonly IMongoDBService _mongoDBService;

        public GHbEventProviderService(
            ILogger<GHbEventProviderService> logger,
            IMongoDBService mongoDBService)
        {
            _logger = logger;
            _mongoDBService = mongoDBService;
        }

        public async Task<List<GHbEvent>> GetAsync()
        {
            var models = await _mongoDBService.GetAsync();
            var dtos = models.Select(_toDTO).ToList();
            return dtos;
        }

        public async Task<GHbEvent> Add(GHbEvent ghbEvent) {
            // For this first version, every event is approved automatically
            var model = _toModel(ghbEvent, false, true);
            // Trim the title in case someone attemps to bypass the limitation
            if (model.Title.Length > 32) {
                _logger.LogWarning("Title is too long, this could be an attacker trying to bypass the limitation");
                model.Title = model.Title.Substring(0, 32);
            }
            var newModel = await _mongoDBService.CreateAsync(model);
            var dto = _toDTO(newModel);
            return dto;
        }

        private GHbEvent _toDTO(GHbEventModel model) {
            GHbEvent dto = new GHbEvent(){
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                LocalTimeZoneId = model.LocalTimeZoneId,
                UtcStartTime = model.UtcStartTime,
                UtcEndTime = model.UtcEndTime,
                Location = model.Location
            };
            return dto;
        }

        private GHbEventModel _toModel(GHbEvent dto, bool hasId = false, bool isApproved = false) {
            GHbEventModel model = new GHbEventModel(){
                Title = dto.Title,
                Description = dto.Description,
                LocalTimeZoneId = dto.LocalTimeZoneId,
                UtcStartTime = dto.UtcStartTime,
                UtcEndTime = dto.UtcEndTime,
                Location = dto.Location,
                IsApproved = isApproved
            };
            if (hasId) {
                model.Id = dto.Id;
            }
            return model;
        }
    }
}
