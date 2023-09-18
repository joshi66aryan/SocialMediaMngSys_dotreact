using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkApp.Repositories.PostRepo;

namespace SocialNetworkApp.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowLocalhost")]   // for cors policy. 
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository? _postRepository;

        Response response = new Response();
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository ?? throw new ArgumentNullException(nameof(postRepository));
        }



        [HttpPost("post")]                         // creating  post.
        public async Task<Response> NewPost( Post posts)
        {
            var createPost = new Post()
            {
                Title = posts.Title,
                Content = posts.Content,
                Email = posts.Email,
                IsActive = 1,
                CreatedOn = DateTime.Now
            };

            await _postRepository.AddPost(createPost);
            await _postRepository.SaveChangesAsync();

            response.StatusCode = 200;
            response.StatusMessage = "Post is created";

            return response;
        }


        [HttpGet("listPost")]
        public async Task<Response> ListPost ()
        {
            List<Post> lstPost = await _postRepository.GetAllPost();

            if (lstPost.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Posts list is created";
                response.listPost = lstPost;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No post is found";
                response.listPost = null;
            }
            return response;
        }

        [HttpDelete("deletePost/{Id}")]
        public async Task<Response> DeletePosts(int Id)
        {

            // check if post already exists

            var reqPost = await _postRepository.GetPostById(Id);

            if (reqPost == null)
            {
                response.StatusMessage = "User does not Exists";
                response.StatusCode = 400;
                return response;
            }

            await _postRepository.DeletePost(reqPost);

            response.StatusMessage = "Post is successfully deleted.";
            response.StatusCode = 200;
            return response;

        }
    }
}
