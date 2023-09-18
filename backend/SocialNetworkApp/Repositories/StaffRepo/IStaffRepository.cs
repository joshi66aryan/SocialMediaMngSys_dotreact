using System;
namespace SocialNetworkApp.Repositories.StaffRepo
{
	public interface IStaffRepository
	{
        Task<bool> StaffExists(string email);
        Task AddStaff(Staff staffs);
        Task SaveChangesAsync();
        Task<Staff> FetchStaffById(int Id);
        Task<List<Staff>> GetAllStaffs( );
        Task DeleteStaff(Staff reqStaff);
    }
}

