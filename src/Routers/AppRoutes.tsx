import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar.tsx'
import Header from '../Components/Header/Header.tsx'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Random from '../Components/Random.tsx';
import AdminDashboard from '../Layout/AdminDashboard.tsx';
const AppRoutes = () => {
  return (
    <>
    <BrowserRouter>
            <Routes>
              <Route path="/" element={<AdminDashboard/>}> 
                 <Route path="/dashboard" element={<Random/>}/>
                 <Route path="/pharmacy" element={<Random/>}/>
                 <Route path="/patients" element={<Random/>}/>
                 <Route path="/doctors" element={<Random/>}/>
                 <Route path="/appointments" element={<Random/>}/>
                 
              </Route>
            </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default AppRoutes