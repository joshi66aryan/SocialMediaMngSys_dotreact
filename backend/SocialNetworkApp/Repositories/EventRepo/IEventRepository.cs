using System;
namespace SocialNetworkApp.Repositories.EventRepo
{
	public interface IEventRepository
	{
        Task SaveChangesAsync();
        Task AddEvent(Events events);
        Task<List<Events>> EventListArticle(Events events);
        Task DeleteEvents(Events reqEvents);
        Task<Events> GetEventsById(int Id);

    }
}

