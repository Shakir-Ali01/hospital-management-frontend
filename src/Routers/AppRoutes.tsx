import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar.tsx'
import Header from '../Components/Header/Header.tsx'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Random from '../Components/Random.tsx';
import AdminDashboard from '../Layout/AdminDashboard.tsx';
import { IconLogin } from '@tabler/icons-react';
import LoginPage from '../Pages/LoginPage.tsx';
import RegisterPage from '../Pages/RegisterPage.tsx';
import PublicRoute from './PublicRoute.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
const AppRoutes = () => {
  return (
    <>
    <BrowserRouter>
            <Routes>
              <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}></Route>
              <Route path="/register" element={<PublicRoute><RegisterPage/></PublicRoute>}></Route>
              <Route path="/" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}> 
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