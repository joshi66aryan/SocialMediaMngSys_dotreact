import React, { useState, useEffect} from 'react'
import axios from 'axios'

import { 
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBTable, 
  MDBTableHead, 
  MDBTableBody,
  MDBBtn
} 
from 'mdb-react-ui-kit';
import { MdDelete, MdCheckCircle } from "react-icons/md";



const RegisterManagement = () => {

  const [userData, setUserData] = useState([])

  useEffect(() => {
   fetchUserData()
  }, [])


  // fectch records
  const fetchUserData = () => {

    const url = 'https://localhost:7039/api/Register/listRegisterUsers';
    const temp = {
      Type: 'USERS'
    }

    axios
    .post(url,temp)
    .then( res => {
      const data = res.data
      if (data.statusCode == 200) {
        setUserData(data.listRegistration)
      }
    })
    .catch( err => console.log(err))
  }

  // delete record
  const handleDelete = (id) => {

    const deleteUserUrl = " https://localhost:7039/api/Register/deleteUser/ ";
    if(window.confirm('Are you sure to delete this record?')){
      axios
        .delete(deleteUserUrl + id)
        .then((res) => {
          const data = res.data;
          if(data.statusCode == 200){
            fetchUserData()
          }
        })
        .catch( err => console.log(err))
    }
  }

  // for approval of user credentials.

  const handleApproval = (id) => {

    const approvalUrl = "https://localhost:7039/api/Register/userApproval/ "

    if(window.confirm("Are you sure to approve this user's credentials?")){
      axios
        .patch(approvalUrl + id)
        .then(res => {
          const data = res.data;
          if(data.statusCode == 200){
            fetchUserData()
          }
        })
        .catch(err =>  console.log(err))
    }
  }

  return (
    <MDBContainer className=" p-3 my-5 d-flex flex-column ">
      <MDBCard>
        <MDBCardBody>
          <MDBTable className='caption-top'>

            <caption>List of users</caption>
            <MDBTableHead>
              <tr>
                <th scope='col'>Id</th>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>PhoneNo</th>
                <th scope='col'>IsApproved</th>
                <th scope='col'>Status</th>
                <th scope='col'>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>

              {  userData.map((value, i) => 
                  <tr key ={i}>
                    <th scope='row'>{value.id}</th>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.phoneNo}</td>
                    <td>{value.isApproved}</td>
                    <td>{ (value.isApproved)? 'Approved':'Pending'}</td>
                    <td>
                      {   
                        <div className='d-flex'>   

                          <MDBBtn 
                            floating 
                            tag='a' 
                            onClick = {() => handleApproval(value.id)}
                            style={{ marginRight:'15px'}} 
                            className='d-flex justify-content-center align-items-center'
                          >
                            <MdCheckCircle style ={{fontSize:'16px', }}/>
                          </MDBBtn>  

                          <MDBBtn 
                            floating 
                            tag='a' 
                            color='danger' 
                            onClick = {() => handleDelete(value.id)}
                            className='d-flex justify-content-center align-items-center'
                          >
                            <MdDelete style ={{fontSize:'16px', }}/>
                          </MDBBtn>  

                        </div>   
                      }
                    </td>
                  </tr>

                )
              } 

            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default RegisterManagement













