import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { 
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBBtn,
    MDBTextArea,
    MDBInput
  } 
  from 'mdb-react-ui-kit';
  import { MdDelete } from "react-icons/md";

const StaffManagement = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [staffData, setStaffData] = useState([])
    const [ contentToggle, setContentToggle] = useState('')



    // for fetching all the post data
     useEffect(() => {
        fetchStaffData()
    }, [ ]) 

    //fetching post data from database.
     const fetchStaffData = () => {
    
        const gettUrl = 'https://localhost:7039/api/Staffs/listStaffs';

        axios
        .get(gettUrl)
        .then( res => {
        const data = res.data
            if (data.statusCode == 200) {
                setStaffData(data.listStaffs)
            }
        })
        .catch( err => console.log(err))  
    }

    // creating new staff credentials.
    const handleSubmit  = () => {

        const staffCredentials = {
            Name: name,
            Email: email,
            Password:password
        }

        const postUrl = 'https://localhost:7039/api/Staffs/addStaffs';

        if(name && email && password){

            axios.post(postUrl,staffCredentials)
            .then(res => {

                const data = res.data;
                alert(`${data.statusMessage}`);
                if(data.statusCode == 200){
                    clearField();
                    fetchStaffData()
                }
            })
            .catch(err => console.log(err))
        }
        else {
            alert("Enter post details!")
        }
    }

    const clearField = ( ) => {
        setName('')
        setEmail('')
        setPassword('')
    }

    // delete post
    const handleDelete = (id) => {
        const deletesStaffUrl = " https://localhost:7039/api/Staffs/deleteStaffs/ ";
        if(window.confirm('Are you sure to delete this record?')){
            axios
            .delete(deletesStaffUrl + id)
            .then((res) => {
                const data = res.data;
                if(data.statusCode == 200){
                    fetchStaffData()
                }
            })
            .catch( err => console.log(err))
        }
        }

    return (

        <MDBContainer className=" p-3 my-5 d-flex flex-column ">
          <MDBCard>

            <MDBCardBody>
              <MDBTable className='caption-top'>
                    <caption>List of Staff Created</caption>
                <MDBTableHead>
                  <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Action</th>
                  </tr>
                </MDBTableHead>

                { <MDBTableBody>
    
                  { staffData.map((value, i) => 
                      <tr key ={i}>
                        <th scope='row'>{value.id}</th>
                        <th scope='row'>{value.name}</th>
                        <td>{value.email}</td>
                        <td>
                            { 
                                <MDBBtn 
                                    floating 
                                    tag='a' 
                                    color='danger' 
                                    onClick = {() => handleDelete(value.id)}
                                    className='d-flex justify-content-center align-items-center'
                                >
                                    <MdDelete style ={{fontSize:'16px', }}/>
                                </MDBBtn>   
                            }
                        </td>
                      </tr>
                    )
                } 
                </MDBTableBody> }

              </MDBTable>
              <MDBBtn onClick = {() => setContentToggle(true)}>Create</MDBBtn>
            </MDBCardBody>
          </MDBCard>

          <MDBCard  style ={{marginTop:"50px"}}>
            { contentToggle && 
                    <MDBCardBody >

                        <div>

                            <MDBInput 
                                label='Name'  
                                id='form1' 
                                type='text' 
                                className='my-4'
                                onChange = {e => setName(e.target.value)}
                                value={name}
                            />
                            <MDBInput 
                                label='Email'  
                                id='form2' 
                                type='email' 
                                className='my-4'
                                onChange = {e => setEmail(e.target.value)}
                                value={email}
                            />
                            <MDBInput 
                                label='Password'  
                                id='form3' 
                                type='password' 
                                className='my-4'
                                onChange = {e => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>

                        <div className='my-4'>
                            <MDBBtn 
                                onClick = {handleSubmit}    
                            >
                                Submit
                            </MDBBtn>

                            <MDBBtn 
                                onClick = {() => setContentToggle(false)}
                                color='danger'
                                className='ms-3'
                            >
                                Close
                            </MDBBtn>
                        </div>

                    </MDBCardBody>
                }
          </MDBCard>
        </MDBContainer> 
    );
}

export default StaffManagement