using GreetHubApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace GreetHubApi.Services
{
    public interface IMongoDBService {
        Task<List<GHbEventModel>> GetAsync();
        Task<GHbEventModel> CreateAsync(GHbEventModel gHbEvent);
    }

    public class MongoDBService: IMongoDBService
    {

        private readonly IMongoCollection<GHbEventModel> _eventsCollection;

        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _eventsCollection = database.GetCollection<GHbEventModel>(mongoDBSettings.Value.CollectionName);
        }

        public async Task<List<GHbEventModel>> GetAsync() { 
            return await _eventsCollection.Find(new BsonDocument()).ToListAsync();
        }
        public async Task<GHbEventModel> CreateAsync(GHbEventModel gHbEvent) {
            await _eventsCollection.InsertOneAsync(gHbEvent);
            return gHbEvent;
        }
    }
}