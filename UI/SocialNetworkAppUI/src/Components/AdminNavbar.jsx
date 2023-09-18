import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { MdMenu } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom'


const AdminNavbar = () => {
  
  const navigate = useNavigate();
  const [showBasic, setShowBasic] = useState(false);
  const [logInUserName, setLogInUserName] = useState(" ");


  useEffect(() => {
    setLogInUserName(localStorage.getItem("LogInAdminName"))
  }, [])
  
  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("LogInAdminName");
    navigate("/")
  }

  return (
    <div style ={{
      position: 'fixed',
      top:'0',
      left:'0',
      width:'100%',
      zIndex:'999'
    }}>
      <MDBNavbar expand='lg' light bgColor='light' >
        <MDBContainer fluid>
          <MDBNavbarBrand >SocialNetworkApp</MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
          >
            <MdMenu/>
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

              <MDBNavbarItem>
                <MDBNavbarLink active style={{ color: '#3b71ca'}} >
                  Welcome {logInUserName}!
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem >
                <NavLink
                  style={({ isActive }) => ({ 
                    color: isActive ? 'grey' : 'black' ,
                    textDecoration: 'none',
                    lineHeight: '40px'
                  })}
                  to='/adminDashboard/registerList'
                >
                  Registration
                </NavLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <NavLink
                    style={({ isActive }) => ({ 
                      color: isActive ? 'grey' : 'black' ,
                      textDecoration: 'none',
                      lineHeight: '40px',
                      paddingLeft: '10px'
                    })}
                    to='/adminDashboard/articleList'
                  >
                    Articles
                </NavLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <NavLink
                    style={({ isActive }) => ({ 
                      color: isActive ? 'grey' : 'black' ,
                      textDecoration: 'none',
                      lineHeight: '40px',
                      paddingLeft: '10px'
                    })}
                    to='/adminDashboard/postList'
                  >
                    Posts
                </NavLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <NavLink
                    style={({ isActive }) => ({ 
                      color: isActive ? 'grey' : 'black' ,
                      textDecoration: 'none',
                      lineHeight: '40px',
                      paddingLeft: '10px'
                    })}
                    to='/adminDashboard/staffList'
                  >
                    Staff
                </NavLink>
              </MDBNavbarItem>

            </MDBNavbarNav>

            <MDBBtn  
              color='primary '
              onClick = {e => logOut(e)}
            > 
              Logout 
            </MDBBtn>

          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>

  )
}

export default AdminNavbar





    




