using System.Collections.Generic;
using System.Threading.Tasks;
using GreetHubApi.DTOs;
using GreetHubApi.Models;
using GreetHubApi.Services;
using Moq;
using Xunit;

public class GHbEventProviderServiceTests
{
    [Fact]
    public async Task GetAsync_ShouldReturnListOfEvents()
    {
        // Arrange
        var expectedEvents = new List<GHbEventModel> {
            new GHbEventModel { Id = "first_event_id", Title = "Event 1", Description = "desc1", LocalTimeZoneId = "tz1", Location = "loc1", UtcStartTime = System.DateTime.Now, UtcEndTime = System.DateTime.Now.AddHours(1), IsApproved = true },
            new GHbEventModel { Id = "second_event_id", Title = "Event 2", Description = "desc2", LocalTimeZoneId = "tz2", Location = "loc2", UtcStartTime = System.DateTime.Now, UtcEndTime = System.DateTime.Now.AddHours(2), IsApproved = true }
        };
        var mongoDBServiceMock = new Mock<IMongoDBService>();
        mongoDBServiceMock.Setup(service => service.GetAsync()).ReturnsAsync(expectedEvents);
        var service = new GHbEventProviderService(mongoDBServiceMock.Object);

        // Act
        var result = await service.GetAsync();

        // Assert
        for (int i=0; i<expectedEvents.Count; i++) {
            Assert.Equal(expectedEvents[i].Id, result[i].Id);
            Assert.Equal(expectedEvents[i].Title, result[i].Title);
            Assert.Equal(expectedEvents[i].Description, result[i].Description);
            Assert.Equal(expectedEvents[i].LocalTimeZoneId, result[i].LocalTimeZoneId);
            Assert.Equal(expectedEvents[i].Location, result[i].Location);
            Assert.Equal(expectedEvents[i].UtcStartTime, result[i].UtcStartTime);
            Assert.Equal(expectedEvents[i].UtcEndTime, result[i].UtcEndTime);
        }
    }

    [Fact]
    public async Task CreateAsync_ShouldReturnCreatedEvent()
    {
        // Arrange
        var now = System.DateTime.Now;
        var inputEvent = new GHbEvent { Title = "Event 1", Description = "desc1", LocalTimeZoneId = "tz1", Location = "loc1", UtcStartTime = now, UtcEndTime = now.AddHours(1) }; ;
        var expectedEvent = new GHbEventModel { Id = "first_event_id", Title = "Event 1", Description = "desc1", LocalTimeZoneId = "tz1", Location = "loc1", UtcStartTime = now, UtcEndTime = now.AddHours(1) };
        var mongoDBServiceMock = new Mock<IMongoDBService>();
        mongoDBServiceMock.Setup(service => service.CreateAsync(It.IsAny<GHbEventModel>())).ReturnsAsync(expectedEvent);
        var service = new GHbEventProviderService(mongoDBServiceMock.Object);

        // Act
        var result = await service.Add(inputEvent);

        // Assert
        Assert.Equal(expectedEvent.Id, result.Id);
        Assert.Equal(expectedEvent.Title, result.Title);
        Assert.Equal(expectedEvent.Description, result.Description);
        Assert.Equal(expectedEvent.LocalTimeZoneId, result.LocalTimeZoneId);
        Assert.Equal(expectedEvent.Location, result.Location);
        Assert.Equal(expectedEvent.UtcStartTime, result.UtcStartTime);
        Assert.Equal(expectedEvent.UtcEndTime, result.UtcEndTime);
    }
}