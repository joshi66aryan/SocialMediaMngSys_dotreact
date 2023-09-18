
using System;
namespace SocialNetworkApp.Model
{
    public class Response
    {
        public int StatusCode { get; set; }
        public string? StatusMessage { get; set; }
        public List<Register>? listRegistration { get; set; }

        public Register? Register { get; set; }
        public List<Article>? listArticle { get; set; }
        public List<Post>? listPost { get; set; }
        public List<Events>? listEvents { get; set; }
        public List<Staff>? listStaffs { get; set; }

    }
}