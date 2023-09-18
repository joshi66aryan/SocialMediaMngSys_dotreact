using System;
using System.Linq;
using Microsoft.Identity.Client;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkApp.Model;
using Azure.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace SocialNetworkApp.Repositories.ArticleRepo
{
	public class ArticleRepository: IArticleRepository
    {
        private readonly DatabaseConnectionContext _dbContextArticle;

        public ArticleRepository(DatabaseConnectionContext dbContextArticle)   // database dependency injection for acessing  article table.
        {
            _dbContextArticle = dbContextArticle;
        }

        public async Task SaveChangesAsync()   
        {
            await _dbContextArticle.SaveChangesAsync();  

        }

        public async Task AddArticle(Article article)           // add articles to table 'article.'
        {
            await _dbContextArticle.article.AddAsync(article);
        }

        public async Task<List<Article>> GetAllArticles(Article article)  // retrieve all the article.
        {
            if (article.Type == "User")
            {
                return await _dbContextArticle.article.Where(x => x.Email == article.Email && x.IsActive == 1).ToListAsync();
            }

            if (article.Type == "Page")
            {
                return await _dbContextArticle.article.Where(x => x.IsActive == 1).ToListAsync();
            }

            return new List<Article>();
        }

        public async Task<Article> GetArticleById(int Id)   //  Get articles by Id.
        {
            return await _dbContextArticle.article.FirstOrDefaultAsync(article => article.ID == Id);
        }

        public async Task<Article> ApproveArticle(int Id)  // approve article by id
        {
            var article = await GetArticleById(Id);
            article.IsApproved = 1;
            await SaveChangesAsync();
            return article;

        }

        public async Task DeleteArticle(Article article)
        {
            _dbContextArticle.article.Remove(article);
            await _dbContextArticle.SaveChangesAsync();

        }


    }
}




/// Repositories   ------------------------------------------------->

    ///Purpose:

        ///Repositories are used to abstract the data access layer.
        /// They provide an interface to interact with the underlying data storage (database, file system, external API, etc.),
        /// allowing the application to perform CRUD operations on the data without being concerned about the data storage details.

        ///  separation of concern (separates data access logic from business logic), testability(facilitate unit testing),
        ///  Single Responsibility Principle, Abstraction of Data Acess, Code Reuseability, Encapsulation of Query Logic, Performance Optimization.

    ///When to use:

        ///Use repositories when you need to separate data access concerns from the rest of the application.
        ///This helps in making your code more maintainable and allows you to switch between different data
        ///storage solutions without impacting the entire application.

    ///Example:

        ///In the same e-commerce application, you might have a ProductRepository that handles operations like fetching products from a database,
        ///adding new products, updating product information, etc.


/// Services   ------------------------------------------------->


    /// Complex business logic:

        /// If you have complex operations that involve multiple steps or require coordination between different components,
        /// it's a good idea to encapsulate that logic within a service. 
        /// Services can provide a higher level of abstraction and make your code more maintainable and testable.

    /// Dependency injection:

        /// ASP.NET Core encourages the use of dependency injection (DI) for managing the dependencies of your application.
        /// Services are typically registered with the DI container and injected into the controllers or other services that require them.
        /// This allows for better separation of concerns and easier unit testing.

    ///Cross - cutting concerns: Services can handle cross -

        ///cutting concerns such as logging, caching, authentication, authorization,
        ///and external integrations.By centralizing these concerns in services,
        ///you can avoid duplicating code throughout your application.