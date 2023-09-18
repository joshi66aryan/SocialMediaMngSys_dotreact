using System;
namespace SocialNetworkApp.Repositories.PostRepo
{
	public interface IPostRepository
	{
        Task SaveChangesAsync();
        Task AddPost(Post post);
        Task<List<Post>> GetAllPost();
        Task DeletePost(Post reqPost);
        Task<Post> GetPostById(int Id);
    }
}

