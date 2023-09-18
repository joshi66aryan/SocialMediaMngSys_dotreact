using System;
using Microsoft.EntityFrameworkCore;

namespace SocialNetworkApp.Repositories.PostRepo
{
	public class PostRepository: IPostRepository
	{
        private readonly DatabaseConnectionContext _dbContextPost;

        public PostRepository(DatabaseConnectionContext dbContextPost)   // database dependency injection for acessing  post table.
        {
            _dbContextPost = dbContextPost;
        }

        public async Task SaveChangesAsync()     // save 
        {
            await _dbContextPost.SaveChangesAsync();
        }

        public async Task AddPost(Post post)  // add new post to 'post' table.
        {
           await _dbContextPost.post.AddAsync(post);
        }

        public async Task<List<Post>> GetAllPost()   // get all post at once in list.
        {
            return await _dbContextPost.post.ToListAsync();
        }

        public async Task DeletePost(Post reqPost)
        {

            _dbContextPost.post.Remove(reqPost);
            await _dbContextPost.SaveChangesAsync();

        }
        public async Task<Post> GetPostById(int Id)   //  request user by id.
        {
            return await _dbContextPost.post.FirstOrDefaultAsync(user => user.ID == Id);
        }
    }
}







