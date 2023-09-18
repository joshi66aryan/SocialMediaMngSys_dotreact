
import React from 'react'
import { AdminNavbar, RegisterManagement, ArticleManagement, PostManagement, StaffManagement, NotFound } from '../Components'
import { Route, Routes } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div style ={{  paddingTop:'70px' }}>
        <Routes>
          <Route path="/registerList" element={<RegisterManagement/>} />
          <Route path="/articleList" element={<ArticleManagement/>} />
          <Route path="/postList" element={<PostManagement/>} />
          <Route path="/staffList" element={<StaffManagement/>} />
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard