using System.Collections.Generic;
using System.Threading.Tasks;
using GreetHubApi.Controllers;
using GreetHubApi.DTOs;
using GreetHubApi.Services;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

public class GHbEventControllerTests
{
  [Fact]
  public async Task GetAsync_ShouldReturnListOfEventsFromProvider()
  {
    // Arrange
    var expectedEvents = new List<GHbEvent> {
            new GHbEvent { Id = "first_event_id", Title = "Event 1", Description = "desc1", LocalTimeZoneId = "tz1", Location = "loc1", UtcStartTime = System.DateTime.Now, UtcEndTime = System.DateTime.Now.AddHours(1) },
            new GHbEvent { Id = "second_event_id", Title = "Event 2", Description = "desc2", LocalTimeZoneId = "tz2", Location = "loc2", UtcStartTime = System.DateTime.Now, UtcEndTime = System.DateTime.Now.AddHours(2) }
        };
    var eventProviderServiceMock = new Mock<IGHbEventProviderService>();
    eventProviderServiceMock.Setup(service => service.GetAsync()).ReturnsAsync(expectedEvents);
    var loggerMock = new Mock<ILogger<GHbEventController>>();
    var controller = new GHbEventController(loggerMock.Object, eventProviderServiceMock.Object);

    // Act
    var result = await controller.GetAsync();

    // Assert
    var events = Assert.IsType<List<GHbEvent>>(result);
    Assert.Equal(expectedEvents.Count, events.Count);

    for (int i=0; i<expectedEvents.Count; i++) {
      Assert.Equal(expectedEvents[i].Id, events[i].Id);
      Assert.Equal(expectedEvents[i].Title, events[i].Title);
      Assert.Equal(expectedEvents[i].Description, events[i].Description);
      Assert.Equal(expectedEvents[i].LocalTimeZoneId, events[i].LocalTimeZoneId);
      Assert.Equal(expectedEvents[i].Location, events[i].Location);
      Assert.Equal(expectedEvents[i].UtcStartTime, events[i].UtcStartTime);
      Assert.Equal(expectedEvents[i].UtcEndTime, events[i].UtcEndTime);
    }

  }

  [Fact]
  public async Task Post_ShouldReturnCreatedEventWithId()
  {
    // Arrange
    var now = System.DateTime.Now;
    var inputEvent = new GHbEvent();
    var expectedEvent = new GHbEvent { Id = "first_event_id", Title = "Event 1", Description = "desc1", LocalTimeZoneId = "tz1", Location = "loc1", UtcStartTime = now, UtcEndTime = now.AddHours(1) };
    var eventProviderServiceMock = new Mock<IGHbEventProviderService>();
    eventProviderServiceMock.Setup(service => service.Add(inputEvent)).ReturnsAsync(expectedEvent);
    var loggerMock = new Mock<ILogger<GHbEventController>>();
    var controller = new GHbEventController(loggerMock.Object, eventProviderServiceMock.Object);

    // Act
    var result = await controller.Post(inputEvent);

    // Assert
    var eventResult = Assert.IsType<GHbEvent>(result);
    Assert.Equal(expectedEvent.Id, eventResult.Id);
    Assert.Equal(expectedEvent.Title, eventResult.Title);
    Assert.Equal(expectedEvent.Description, eventResult.Description);
    Assert.Equal(expectedEvent.LocalTimeZoneId, eventResult.LocalTimeZoneId);
    Assert.Equal(expectedEvent.Location, eventResult.Location);
    Assert.Equal(expectedEvent.UtcStartTime, eventResult.UtcStartTime);
    Assert.Equal(expectedEvent.UtcEndTime, eventResult.UtcEndTime);
  }
}