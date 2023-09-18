import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { 
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBTable, 
  MDBTableHead, 
  MDBTableBody,
  MDBBtn,
  MDBInput,
  MDBTextArea,
  MDBCardImage
} 
from 'mdb-react-ui-kit';

const UserAddArticles = () => {

  const [articleData, setArticleData] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const [imageSrc, setImageSrc] = useState('')
  const [fileName, setFileName] = useState('')
  const [ contentToggle, setContentToggle] = useState('')


  useEffect(() => {
    fetchArticleData()
  }, [ ])

  const headers = {
    "Content-Type": "multipart/form-data" // Set the correct content type
  };

  // fetch the articles data.
  const fetchArticleData = () => {

    const getArticleData = { 
      Type: 'User',
      Email: localStorage.getItem('LogInUserEmail')
    }
    const getArticleUrl = "https://localhost:7039/api/Article/listArticle"

    axios
      .post(getArticleUrl,getArticleData)
      .then(res => {

        const data = res.data;
       if (data.statusCode == 200) {
          setArticleData(data.listArticle)
        }

      })
      .catch(err => console.log(err))
  }

  // show the preview of uploded picture.
  const showPreview = (e) => {

    if(e.target.files && e.target.files[0]) {

        let selectedImageFile = e.target.files[0];   
        const reader = new FileReader();

        reader.onload = x => {     // updating properties of values state
          setImageSrc(x.target.result)
          setFile(selectedImageFile)
          setFileName(e.target.files[0].name)
        }
        reader.readAsDataURL(selectedImageFile)
    } 
  }

  const handleUpload = () => {

    const userArticleData = {
      Title: title,
      Content: content,
      Email: localStorage.getItem('LogInUserEmail'),
      Image: fileName,
      ImageFile: file,
      ImageSrc: ''
    }

    console.log(userArticleData)

    const postArticleURL = "https://localhost:7039/api/Article/postArticle"
    if (title && content && file){

      axios
        .post(postArticleURL, userArticleData, {headers})
        .then(res => {

          const postResData = res.data;
          alert(`${postResData.statusMessage}`);
          if(postResData.statusCode == 200){

              clearField();
              fetchArticleData()

          }
          console.log(postResData)
          
        })
        .catch(err => console.log(err))

    }
    else {
      alert('Enter your article data!')
    }
  }

  const fileInputRef = useRef(null);

  const clearField = ( ) => {
    setImageSrc('')
    setFile('')
    setFileName('')
    setImageSrc('')
    setFile('')
    setTitle('')
    setContent('')
    fileInputRef.current.value = null;
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

            
            <caption> Your Articles</caption>
            <MDBTableHead>
              <tr>
                <th scope='col'>Id</th>
                <th scope='col'>Title</th>
                <th scope='col'>Content</th>
                <th scope='col'>Email</th>
                <th scope='col'>Image</th>
                <th scope='col'>IsApproved</th>
                <th scope='col'>Status</th>
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

              {/* show preview of uploaded image. */}
              {
                imageSrc && <div style = {{             
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>

                  <div style = {{
                      maxWidth:'450px',
                      display: 'flex',
                      justifyContent: 'center', // Center the image horizontally
                      alignItems: 'center'
                    }}>

                    <MDBCardImage 
                      src= {imageSrc} 
                      alt="Card image"  
                      style={{ 
                          width:'100%',
                        }}
                    />
                  </div>
                </div>
              }


              { /* input form */ }
              <div>  
                  <MDBInput 
                      label='Title'  
                      type='text' 
                      className='my-4'
                      onChange = {e => setTitle(e.target.value)}
                      value={title}
                  />

                  <MDBInput 
                    wrapperClass='mb-4' 
                    type='file'
                    accept='image/*'
                    onChange={showPreview}
                    ref={fileInputRef}
                  />

                  <MDBTextArea 
                      label='Content' 
                      rows={4} 
                      className='my-4'
                      onChange = {e => setContent(e.target.value)}
                      value = {content}
                  />
              </div>

              { /* button for submitting and closing.*/ }
              <div className='my-4'>          
                  <MDBBtn                            
                      onClick = {handleUpload}    
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

export default UserAddArticles