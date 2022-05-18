import React from 'react';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import PublicNavbar from '../components/navbars/PublicNavbar';

import Index from '../components/Index';
import Login from '../components/auth/Login';

export const PublicRoutes = () => {
    return (
    <BrowserRouter>
    
        <PublicNavbar />

        <Routes>
            <Route path='/login' element={<Login />} />

            <Route path='/' element={<Index />} />
            {/*<Route path='*' element={<Navigate replace to="/"/>} />*/}
        </Routes>
    </BrowserRouter>
    )
};