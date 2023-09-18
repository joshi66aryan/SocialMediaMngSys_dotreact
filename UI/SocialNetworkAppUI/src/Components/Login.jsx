
import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCardImage,
}
from 'mdb-react-ui-kit';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userData = {
    Name: '',
    Email: email,
    Password: password,
    PhoneNo: ''
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    const url = 'https://localhost:7039/api/Register/login';

    if(email && password){

      axios
      .post(url,userData)
      .then( res => {

        const temp = res.data;
        if(temp.statusCode === 200){
          console.log(Number.isInteger(temp.register.isApproved))
          if(temp.register.isApproved === 1  || temp.register.type === "ADMIN" ||temp.register.type === "STAFF"){

            alert(temp.statusMessage)
            clearField()

            if(temp.register.type === "ADMIN" && password.toLowerCase() === "admin"){
              localStorage.setItem("LogInAdminName", email)
              navigate("/adminDashboard")
            }
            else {
              localStorage.setItem("LogInUserEmail", email)
              localStorage.setItem("LogInUserName", temp.register.name)
              if( temp.register.type === "STAFF"){ navigate("/staffDashboard") }
              else {  navigate("/userDashboard") }
            }
          } 
          else { alert("User is not approved")}
        } 
        else { alert(`${temp.statusMessage}`) }    

      })
      .catch( err => console.log(err)) 
    }
    else { alert("Enter your credential") }
  } 

  const clearField = ( ) => {

    setEmail('')
    setPassword('')

  }

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center" style={{minHeight:'100vh'}}>
      <MDBCard style={{ maxWidth: '940px' }}>

        <MDBRow className=' d-flex justify-content-center align-items-center '>

          <MDBCol md='6'>
            <MDBCardImage 
              src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' 
              alt='phone'
              className='rounded-t-5 rounded-tr-lg-0 w-100' 
          
            />
          </MDBCol>

          <MDBCol md='6' >

            <MDBCardBody>

              <MDBInput 
                wrapperClass='mb-4' 
                label='Email address' 
                id='form2' 
                type='email'
                onChange={e => setEmail(e.target.value)}
                value = {email}
              />

              <MDBInput
                wrapperClass='mb-4' 
                label='Password' 
                id='form3' 
                type='password'
                onChange={e => setPassword(e.target.value)}
                value = {password}
              />

              <MDBBtn 
                type ='button'
                className="d-block w-50 m-auto "
                onClick = {e => handleSubmit(e)}
              >
                Sign In
              </MDBBtn>

              <div className="my-4  text-center fs-6" >
                <p>Not a member? <span> <Link to ='/'>Sign Up</Link></span></p>
              </div>

              <div  className="my-4 d-block w-50 m-auto ">

                <p  className="d-block w-50 m-auto mb-4 text-center"> or </p>

                <div className="d-flex justify-content-center align-items-center ">

                  <MDBBtn floating color="secondary" className='mx-1'>
                    <FaFacebookF/>
                  </MDBBtn>

                  <MDBBtn floating color="secondary" className='mx-1'>
                    <FaGoogle/>
                  </MDBBtn>

                </div>

              </div>
            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  )
}

export default Login




  
    





  
    



