using System;
using SocialNetworkApp.Repositories.Users;

namespace SocialNetworkApp.Repositories.Users
{
	public class UserRepository:IUserRepository
	{

		private readonly DatabaseConnectionContext _dbContext;

		public UserRepository(DatabaseConnectionContext dbContext)   // database dependency injection.
		{
			_dbContext = dbContext;
		}


        public async Task<bool> UserExists(string email)  // check if same user exists
        {
            return await _dbContext.register.AnyAsync(user => user.Email == email);
        }


        public async Task AddUser(Register user)  // upload in register
        {
            await _dbContext.register.AddAsync(user);
        }


        public async Task SaveChangesAsync()     // save 
        {
            await _dbContext.SaveChangesAsync();
        }


        public async Task<Register> GetUserByEmail(string email)  // request user credential by email.
        {
            return await _dbContext.register.FirstOrDefaultAsync(user => user.Email == email);
        }


        public async Task<Register> GetUserById(int Id)   //  request user by id.
        {
            return await _dbContext.register.FirstOrDefaultAsync(user => user.ID == Id);
        }


        public async Task<List<Register>> GetAllUsers(Register register)  // retrieve all the registered users.
        {

            return await _dbContext.register.Where(x => x.IsActive == 1 &&  register.Type == x.Type ).ToListAsync();
        }

        public  async Task<Register> ApproveUser(int Id)  // approve user by id
        {
            var user = await GetUserById(Id);
            user.IsApproved = 1;
            await SaveChangesAsync();
            return user;
            
        }

        public async Task DeleteUser(Register reqUser)
        {

            _dbContext.register.Remove(reqUser);
            await _dbContext.SaveChangesAsync();

        }


    }
}

