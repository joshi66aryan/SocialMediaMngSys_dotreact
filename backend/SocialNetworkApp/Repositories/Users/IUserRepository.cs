using System;
namespace SocialNetworkApp.Repositories.Users
{
	public interface IUserRepository
	{
        Task<bool> UserExists(string email);
        Task AddUser(Register user);
        Task SaveChangesAsync();
        Task<Register> GetUserByEmail(string email);
        Task<Register> GetUserById(int Id);
        Task<List<Register>> GetAllUsers(Register register);
        Task<Register> ApproveUser(int Id );
        Task DeleteUser(Register reqUser);

    }
}

