import React from 'react';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import PrivateNavbar from '../components/navbars/PrivateNavbar';

import Dashboard from '../components/Dashboard';
import Logout from '../components/auth/Logout';

import ListaBancos from '../components/bancos/ListaBancos';
import DeudasBanco from '../components/deudas/DeudasBanco';
import DetalleDeuda from '../components/deudas/DetalleDeuda';

export const ProtectedRoutes = () => {
    return (
    <BrowserRouter>

        <PrivateNavbar />

        <Routes>
            <Route path='/logout' element={<Logout />} />

            <Route path='/bancos' element={<ListaBancos />} />
            <Route path='/deudas/:slug' element={<DeudasBanco />} />
            <Route path='/deudas/detalle/:id' element={<DetalleDeuda />} />

            <Route path='/' element={<Dashboard />} />
            {/*<Route path='*' element={<Navigate replace to="/" />} />*/}
        </Routes>
    </BrowserRouter>
    )
};