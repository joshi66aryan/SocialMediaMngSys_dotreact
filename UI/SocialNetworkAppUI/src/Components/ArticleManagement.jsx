
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

const ArticleManagement = () => {

    const [articleData, setArticleData] = useState([])

    useEffect(() => {
     fetchArticleData()
    }, [])
  
    // fetching article  data
    const fetchArticleData = () => {
      const url = 'https://localhost:7039/api/Article/listArticle';

      const temp = {
        Type: 'Page'
      }
        
      axios
      .post(url,temp)
      .then( res => {
        const data = res.data
        if (data.statusCode == 200) {
          setArticleData(data.listArticle)
        }
      })
      .catch( err => console.log(err)) 
    }

    // deleting article
    const handleDelete = (id) => {

      const deleteArticleUrl = " https://localhost:7039/api/Article/deleteArticle/ ";
      if(window.confirm('Are you sure to delete this record?')){
        axios
          .delete(deleteArticleUrl + id)
          .then((res) => {
            const data = res.data;
            if(data.statusCode == 200){
              fetchArticleData()
            }
          })
          .catch( err => console.log(err))
      }
    }

      
  // for approval of user's posted articles.
  const handleApproval = (id) => {

    const approvalUrl = "https://localhost:7039/api/Article/articleApproval/ "
    if(window.confirm("Are you sure to approve this article?")){
      axios
        .patch(approvalUrl + id)
        .then(res => {
          const data = res.data;
          if(data.statusCode == 200){
            fetchArticleData()
          }
        })
        .catch(err =>  console.log(err))
    }
  }

  const showImg = img => <img 
    src = {img} 
    className='card-img-top rounded-circle'   
    style={{ 
      width: "50px", 
      height: "50px", 
      borderRadius: "50%"
    }}
  />

  return (

        <MDBContainer className=" p-3 my-5 d-flex flex-column ">
          <MDBCard>
            <MDBCardBody>
              <MDBTable className='caption-top'>
    
                
                <caption>List of Articles</caption>
                <MDBTableHead>
                  <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Content</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Image</th>
                    <th scope='col'>IsApproved</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Action</th>
                  </tr>
                </MDBTableHead>

                { <MDBTableBody>
    
                  { articleData.map((value, i) => 
                      <tr key ={i} style={{ lineHeight: '50px'}}>
                        <th scope='row'>{value.id}</th>
                        <td>{value.title}</td>
                        <td>{value.content}</td>
                        <td>{value.email}</td>
                        <td>{showImg(value.imageSrc)}</td>
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
                </MDBTableBody> }

              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
    );
}
export default ArticleManagement







  