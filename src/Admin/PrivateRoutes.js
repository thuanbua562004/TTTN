import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../Admin/Navbar';
import './templatemo-style.css'
const PrivateRoute = ({ isAdmin }) => {     
    return isAdmin ? 
    
    <>
    <Navbar/>
    <Outlet />
    </>
    
    : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
