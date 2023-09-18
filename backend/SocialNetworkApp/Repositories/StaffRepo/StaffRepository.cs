using System;
using Microsoft.EntityFrameworkCore;

namespace SocialNetworkApp.Repositories.StaffRepo
{
	public class StaffRepository: IStaffRepository
    {
        private readonly DatabaseConnectionContext _dbContextStaff;

        public StaffRepository(DatabaseConnectionContext dbContextStaff)   // database dependency injection for acessing  staffs table.
        {
            _dbContextStaff = dbContextStaff;
        }


        public async Task<bool> StaffExists(string email)  // check if same user exists
        {
            return await _dbContextStaff.staffs.AnyAsync(x => x.Email == email);
        }


        public async Task AddStaff(Staff staffuser)  // upload in staffs
        {
            await _dbContextStaff.staffs.AddAsync(staffuser);
        }


        public async Task SaveChangesAsync()     // save 
        {
            await _dbContextStaff.SaveChangesAsync();
        }


        public async Task<Staff> FetchStaffById(int Id)
        {
            var staffDataById = await _dbContextStaff.staffs.FindAsync(Id);
            return staffDataById;
        }

        public async Task<List<Staff>> GetAllStaffs( )  // retrieve all the staffs.
        {
            return await _dbContextStaff.staffs.ToListAsync();
        }

        public async Task DeleteStaff( Staff reqStaff)
        {
             _dbContextStaff.staffs.Remove(reqStaff);
            await _dbContextStaff.SaveChangesAsync();

        } 
    }
}


 



