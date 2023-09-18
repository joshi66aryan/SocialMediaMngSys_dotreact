
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


const Registration = () => {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneno, setPhoneno] = useState('');

  const determineUserType = () => {
    if (email.toLowerCase() === 'admin') {
      return 'ADMIN';
    } 
    else if (email.toLowerCase() === 'staff') {
      return 'STAFF';
    }
    else if (email === '') {
      return '';
    }
    
    return 'USERS';
  };

  const userData = {
    Name: name,
    Email: email,
    Password: password,
    PhoneNo: phoneno,
    Type: determineUserType()
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    const url = 'https://localhost:7039/api/Register/registerNewUser';

    if(name && email && password && phoneno){

      axios
        .post(url,userData)
        .then( res => {
            const temp = res.data;
            alert(temp.statusMessage)
            if(temp.statusCode == 200){
              clearField()
              navigate('/login')
            }
        })
        .catch( err => {
          console.log(err)
        }) 
    }
    else {
      alert("Enter your credential")
    }
  } 

  const clearField = ( ) => {
    setEmail('')
    setName('')
    setPassword('')
    setPhoneno('')
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
              label='Name' 
              id='form1' 
              type='text'
              onChange={e => setName(e.target.value)}
              value = {name}
              />

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

              <MDBInput 
                wrapperClass='mb-4' 
                label='PhoneNo' 
                id='form4' 
                type='tel'
                onChange={e => setPhoneno(e.target.value)}
                value={phoneno}
              />

              <MDBBtn 
                type ='button'
                className="d-block w-50 m-auto "
                onClick = {e => handleSubmit(e)}
              >
                Sign Up
              </MDBBtn>

              <div className="my-4  text-center fs-6" >
                <p>Already a member? <span> <Link to= '/login'>Sign In</Link></span></p>
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

export default Registration




  
    



