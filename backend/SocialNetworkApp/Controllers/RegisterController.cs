using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkApp.Repositories.Users;

namespace SocialNetworkApp.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowLocalhost")]   // for cors policy. 
    [ApiController]
    public class RegisterController : ControllerBase
    {

        private readonly IUserRepository? _userRepository;

        public RegisterController(IUserRepository userRepository)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }


        Response response = new Response();   // creating instance of response model, it is saved  in response model.

        [HttpPost("registerNewUser")]
        public async Task<Response> Registration(Register request)
        {
            // destructure request properties
            var (Name, Email, Password, PhoneNo, Type) = (request.Name, request.Email, request.Password, request.PhoneNo, request.Type);

            // check if user already exists.
            if (await _userRepository.UserExists(Email))
            {
                response.StatusMessage = "User Already Exists";
                response.StatusCode = 400;
                return response;
            }


            // make skeleton to populate register.
            var userRegisterItems = new Register
            {
                Name = Name,
                Email = Email,
                Password = Password,
                PhoneNo = PhoneNo,
                IsActive = 1,
                IsApproved = 0,
                Type = Type
            };

            await _userRepository.AddUser(userRegisterItems);  // Set registering user  in repository user --> register in database.
            await _userRepository.SaveChangesAsync();

            response.StatusMessage = "Registration is successful";
            response.StatusCode = 200;


            return response;
        }


        [HttpPost("login")]
        public async Task<Response> Login(Register request)
        {

            // destructure request properties
            var (Name, Email, Password, PhoneNo, Type) = (request.Name, request.Email, request.Password, request.PhoneNo, request.Type);


            var userByEmail = await _userRepository.GetUserByEmail(Email);

            if ( userByEmail == null)
            {
                response.StatusCode = 400;
                response.StatusMessage = "User does not exists";
                return response;
            }

            if ( Password != userByEmail.Password)
            {
                response.StatusCode = 400;
                response.StatusMessage = "User's credential is wrong";
                return response;
            }

            var logedinUserCredential = new Register()
            {
                ID = userByEmail.ID,
                Name = userByEmail.Name,
                Email = userByEmail.Email,
                PhoneNo = userByEmail.PhoneNo,
                Type = userByEmail.Type,
                IsApproved = userByEmail.IsApproved,
                IsActive = userByEmail.IsActive
            };

            response.Register = logedinUserCredential;
            response.StatusCode = 200;
            response.StatusMessage = "Login Successful";

            return response;
        }

        [HttpPost("listRegisterUsers")]
        public async Task<Response> ListRegisterUsers(Register register)
        {

            List<Register> lstUsers = await _userRepository.GetAllUsers(register);

            if (lstUsers.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User list is created.";
                response.listRegistration = lstUsers;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No users is found.";
                response.listRegistration = null;
            }

            return response;
        }

        [HttpPatch("userApproval/{Id}")]
        public async Task<Response> UserApproval( int Id )
        {
            var userById = await _userRepository.GetUserById(Id);

            if (userById == null)
            {
                response.StatusCode = 400;
                response.StatusMessage = "User does not exsist";
                return response;
            }

            if (userById.IsActive == 0)
            {
                response.StatusCode = 400;
                response.StatusMessage = "User is not active";
                return response;
            }

            await _userRepository.ApproveUser(userById.ID);

            response.StatusCode = 200;
            response.StatusMessage = " User Approved";
            return response;                 
         }

        [HttpDelete("deleteUser/{Id}")]
        public async Task<Response> DeleteUsers(int Id)  
        {

            // check if user already exists

            var reqUser = await _userRepository.GetUserById(Id);

            if (reqUser == null)
            {
                response.StatusMessage = "User does not Exists";
                response.StatusCode = 400;
                return response;
            }

            await _userRepository.DeleteUser(reqUser);

            response.StatusMessage = "User's credential is successfully deleted.";
            response.StatusCode = 200;
            return response;

        }
    }

}
