using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkApp.Repositories.EventRepo;

namespace SocialNetworkApp.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowLocalhost")]   // for cors policy. 
    [ApiController]
    public class EventsController : ControllerBase
    {
        Response response = new Response();

        private readonly IEventRepository? _eventsRepository;

        public EventsController(IEventRepository eventsRepository)
        {
            _eventsRepository = eventsRepository ?? throw new ArgumentNullException(nameof(eventsRepository));
        }

        [HttpPost("addEvents")]
        public async Task<Response> CreateEvents(Events events)
        {
            var newEvents = new Events()
            {
                Title = events.Title,
                Content = events.Content,
                Email = events.Email,
                IsActive = events.IsActive,
                CreatedOn = DateTime.Now
            };

            await _eventsRepository.AddEvent(newEvents);
            await _eventsRepository.SaveChangesAsync();

            response.StatusCode = 200;
            response.StatusMessage = "Event is created.";
            return response;

        }

        [HttpGet("listEvents")]
        public async Task<Response> EventListArticle(Events events)
        {

            List<Events> lstEvents = await _eventsRepository.EventListArticle(events);

            if (lstEvents.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Events list is created.";
                response.listEvents = lstEvents;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Events is found.";
                response.listEvents = null;
            }

            return response;
        }

        [HttpDelete("deleteEvents/{Id}")]
        public async Task<Response> DeleteEvent(int Id)
        {

            // check if user already exists

            var reqEvent = await _eventsRepository.GetEventsById(Id);

            if (reqEvent == null)
            {
                response.StatusMessage = "Event does not Exists";
                response.StatusCode = 400;
                return response;
            }

            await _eventsRepository.DeleteEvents(reqEvent);

            response.StatusMessage = "Events is successfully deleted.";
            response.StatusCode = 200;
            return response;

        }
    }
}
