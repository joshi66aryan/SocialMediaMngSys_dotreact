using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Core;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkApp.Repositories.StaffRepo;

namespace SocialNetworkApp.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowLocalhost")]   // for cors policy. 
    [ApiController]
    public class StaffsController : ControllerBase
    {

        private readonly IStaffRepository? _staffsRepository;

        public StaffsController(IStaffRepository staffsRepository)
        {
            _staffsRepository = staffsRepository ?? throw new ArgumentNullException(nameof(staffsRepository));
        }



        Response response = new Response();   // creating instance of response model, it is saved  in response model.

        [HttpPost("addStaffs")]
        public async Task<Response> StaffRegistration(Staff request)
        {

            // check if user already exists
            if (await _staffsRepository.StaffExists(request.Email))
            {
                response.StatusMessage = "Staff Already Exists";
                response.StatusCode = 400;
                return response;
            }

            // make skeleton to populate register.
            var staffRegisterItems = new Staff
            {
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,
                IsActive = 1,
            };

            await _staffsRepository.AddStaff(staffRegisterItems); 
            await _staffsRepository.SaveChangesAsync();

            response.StatusMessage = "Staff Registration is successful";
            response.StatusCode = 200;


            return response;

        }

        [HttpGet("listStaffs")]
        public async Task<Response> ListStaffs()
        {

            List<Staff> lstStaffs = await _staffsRepository.GetAllStaffs();

            if (lstStaffs.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "staffs list is created.";
                response.listStaffs = lstStaffs;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No staffs is found.";
                response.listStaffs = null;
            }

            return response;
        }

        [HttpDelete("deleteStaffs/{Id}")]
        public async Task<Response> DeleteStaff(int Id )
        {

            // check if user already exists

            var reqUser = await _staffsRepository.FetchStaffById(Id);

            if (reqUser == null)
            {
                response.StatusMessage = "Staff does not Exists";
                response.StatusCode = 400;
                return response;
            }

            await _staffsRepository.DeleteStaff( reqUser );  

            response.StatusMessage = "Staff credential is successfully deleted";
            response.StatusCode = 200;
            return response;

        }
    }
}
