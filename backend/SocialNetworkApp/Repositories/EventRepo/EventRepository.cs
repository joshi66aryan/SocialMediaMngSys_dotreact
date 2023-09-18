using System;
using Microsoft.EntityFrameworkCore;

namespace SocialNetworkApp.Repositories.EventRepo
{
	public class EventRepository: IEventRepository
    {
        private readonly DatabaseConnectionContext _dbContextEvent;

        public EventRepository(DatabaseConnectionContext dbContextEvent)   // database dependency injection for acessing  staffs table.
        {
            _dbContextEvent = dbContextEvent;
        }


        public async Task SaveChangesAsync()      // save asynchronously.
        {
            await _dbContextEvent.SaveChangesAsync();

        }

        public async Task AddEvent(Events events)           // add articles to table 'article.'
        {
            await _dbContextEvent.events.AddAsync(events);
        }

        public async Task<List<Events>> EventListArticle(Events events)  // retrieve all the events.
        {
           return await _dbContextEvent.events.Where(x => x.IsActive == 1).ToListAsync();
        }

        public async Task DeleteEvents(Events reqEvents)
        { 
            _dbContextEvent.events.Remove(reqEvents);
            await _dbContextEvent.SaveChangesAsync();

        }

        public async Task<Events> GetEventsById(int Id)   //  request user by id.
        {
            return await _dbContextEvent.events.FirstOrDefaultAsync(user => user.ID == Id);
        }

    }
}

