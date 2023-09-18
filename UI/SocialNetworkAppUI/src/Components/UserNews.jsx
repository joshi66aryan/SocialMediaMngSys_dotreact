
import React, { useState, useEffect} from 'react'
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

const UserNews = () => {

    const [postData, setPostData] = useState([])
    const [ title, setTitle] = useState('')
    const [ content, setContent] = useState('')
    const [ contentToggle, setContentToggle] = useState(false)
    const [logedinUserEmail, setLogedInUserEmail] = useState('')

    // for toggling form card
    useEffect(() => {
        setLogedInUserEmail(localStorage.getItem("LogInUserEmail"))
    })

    // for fetching all the post data
    useEffect(() => {
        fetchPostData()
    }, [])

    //fetching post data from database.
    const fetchPostData = () => {
    
        const gettUrl = 'https://localhost:7039/api/Post/listPost';

        axios
        .get(gettUrl)
        .then( res => {
        const data = res.data
        if (data.statusCode == 200) {
            setPostData(data.listPost)
        }
        })
        .catch( err => console.log(err))  
    }
  
    // posting new post content
    const handleSubmit  = () => {

        const postCredentials = {
            Title: title,
            Content: content,
            Email:logedinUserEmail
        }

        const postUrl = 'https://localhost:7039/api/Post/post';

        if(title && content){

            axios.post(postUrl,postCredentials)
            .then(res => {

                const data = res.data;
                alert(`${data.statusMessage}`);
                if(data.statusCode == 200){
                    clearField();
                    fetchPostData()
                }
            })
            .catch(err => console.log(err))
        }
        else {
            alert("Enter post details!")
        }
    }
    
    const clearField = ( ) => {
        setTitle('')
        setContent('')
    }

    // delete post
    const handleDelete = (id) => {
        const deletePostUrl = " https://localhost:7039/api/Post/deletePost/ ";
        if(window.confirm('Are you sure to delete this record?')){
          axios
            .delete(deletePostUrl + id)
            .then((res) => {
              const data = res.data;
              if(data.statusCode == 200){
                fetchPostData()
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
                    <caption>List of Posts Created</caption>
                <MDBTableHead>
                  <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Content</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Created On</th>
                  </tr>
                </MDBTableHead>

                { <MDBTableBody>
    
                  { postData.map((value, i) => 
                      <tr key ={i}>
                        <th scope='row'>{value.id}</th>
                        <td>{value.title}</td>
                        <td>{value.content}</td>
                        <td>{value.email}</td>  
                        <td>{value.createdOn}</td> 
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
                                label='Title'  
                                id='form1' 
                                type='text' 
                                className='my-4'
                                onChange = {e => setTitle(e.target.value)}
                                value={title}
                            />

                            <MDBTextArea 
                                label='Content' 
                                id='textAreaExample' 
                                rows={4} 
                                className='my-4'
                                onChange = {e => setContent(e.target.value)}
                                value = {content}
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

export default UserNews








  