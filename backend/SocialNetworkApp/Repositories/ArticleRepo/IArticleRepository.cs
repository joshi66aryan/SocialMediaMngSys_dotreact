using System;
namespace SocialNetworkApp.Repositories.ArticleRepo
{
	public interface IArticleRepository
	{
        Task SaveChangesAsync();
        Task AddArticle(Article article);
        Task<List<Article>> GetAllArticles(Article article);
        Task<Article> GetArticleById(int Id);
        Task<Article> ApproveArticle(int Id);
        Task DeleteArticle(Article article);
    }
}

