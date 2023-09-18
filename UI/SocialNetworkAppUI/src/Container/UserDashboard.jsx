import React from 'react'
import { UserNavbar, UserAddArticles, UserNews, NotFound } from '../Components'
import { Route, Routes } from 'react-router-dom'


const UserDashboard = () => {
  return (
    <div>
      <UserNavbar/>
      <div style ={{  paddingTop:'70px' }}>
        <Routes>
          <Route path="/userAddArticle" element={<UserAddArticles/>} />
          <Route path="/userNews" element={<UserNews/>} />
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default UserDashboard