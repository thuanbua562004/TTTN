import React from 'react';
import { Outlet, useNavigate ,Navigate} from 'react-router-dom';
import Navbar from '../Admin/Navbar';
import './templatemo-style.css'
const PrivateRoute = ({ isAdmin }) => {    
    const navigate = useNavigate() 
    if(isAdmin=="undefined") {
        localStorage.removeItem('tokenadmin')
        navigate('https://tttn-pn1v.onrender.com/admin/login')
    }
    return isAdmin ? 
    
    <>
    <Navbar/>
    <Outlet />
    </>
    
    : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
