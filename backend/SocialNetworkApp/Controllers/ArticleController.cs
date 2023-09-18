using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using SocialNetworkApp.Repositories.ArticleRepo;

namespace SocialNetworkApp.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowLocalhost")]   // for cors policy. 
    [ApiController]
    public class ArticleController : ControllerBase
    {

        Response response = new Response();

        private readonly IArticleRepository? _articleRepository;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ArticleController(IArticleRepository articleRepository, IWebHostEnvironment hostEnvironment)
        {
            _articleRepository = articleRepository ?? throw new ArgumentNullException(nameof(articleRepository));
            _hostEnvironment = hostEnvironment;
        }


        [HttpPost("postArticle")]                       // create article.
        public  async Task<Response> CreateArticle( [FromForm]Article articles)
        {
            var newArticle = new Article()
            {
                Title = articles.Title,
                Content = articles.Content,
                Email = articles.Email,
                Image = articles.Image,   // posting image name
                IsActive = 1,
                IsApproved = 0
            };


            await _articleRepository.AddArticle(newArticle);
            await _articleRepository.SaveChangesAsync();

            // for storing file to ImageFile 
            await SaveImage(articles.ImageFile, articles.Image);


            response.StatusCode = 200;
            response.StatusMessage = "Article is posted."; 
            return response;
        }

        [HttpPost("listArticle")]
        public async Task<Response> ListArticle( Article article)
        {

            List <Article> lstArticles = await _articleRepository.GetAllArticles( article );

            if(lstArticles.Count > 0 )
            {
                // Update ImageSrc property for each article

               foreach (var articleItem in lstArticles)
                {
                    articleItem.ImageSrc = string.Format("{0}://{1}{2}/ImageFiles/{3}", Request.Scheme, Request.Host, Request.PathBase, articleItem.Image);
                }

                response.StatusCode = 200;
                response.StatusMessage = "Article list is created.";
                response.listArticle = lstArticles;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No article is found.";
                response.listArticle = null;
            }

            return response;
        }

        [HttpPatch("articleApproval/{Id}")]
        public async Task<Response> ApproveArticle(  int Id ) 
        {
            var getArticleById = await _articleRepository.GetArticleById( Id );
            if (getArticleById == null)
            {
                response.StatusCode = 400;
                response.StatusMessage = "Article does not exsist";
                return response;
            }

            if (getArticleById.IsActive == 0)
            {
                response.StatusCode = 400;
                response.StatusMessage = "Article is not active";
                return response;
            }

            await _articleRepository.ApproveArticle(getArticleById.ID);

            response.StatusCode = 200;
            response.StatusMessage = " Article is Approved";
            return response;

        }

        [HttpDelete("deleteArticle/{Id}")]
        public async Task<Response> DeleteArticle(int Id)
        {

            // check if user already exists

            var reqArticle = await _articleRepository.GetArticleById(Id);

            if (reqArticle == null)
            {
                response.StatusMessage = "User does not Exists";
                response.StatusCode = 400;
                return response;
            }

            await _articleRepository.DeleteArticle(reqArticle);

            response.StatusMessage = "Article is successfully deleted.";
            response.StatusCode = 200;
            return response;

        }

        [NonAction]  
        public async Task SaveImage(IFormFile ImageFile, string imageName)
        {

            if (ImageFile == null || ImageFile.Length == 0)
            {
                throw new ArgumentException("Image file is null or empty.");
            }
                // Create the full image path by combining the content root path and the "Images" folder with the generated image name

            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "ImageFiles", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))    // Create a file stream to save the uploaded image file
            {
                await ImageFile.CopyToAsync(fileStream);         // Copy the content of the uploaded image file to the file stream
            }
        }
    }
}
