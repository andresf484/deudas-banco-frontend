import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { server } from '../../context/Api';
import AuthContext from "../../context/AuthContext";

const PrivateNavbar = () => {

    const { setAuth } = useContext(AuthContext);

    const navigate = useNavigate();

  return (
    
    <div>

    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">App banco (menú autenticado)</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={ () => { navigate('/') }}>Inicio</Nav.Link>
            <Nav.Link onClick={ () => { navigate('/bancos') }}>Lista bancos</Nav.Link>
            

            <Nav.Link onClick={ () => { navigate('/logout') }}>Cerrar sesión</Nav.Link>

            {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>*/}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <br />
    </div>

  )
}

export default PrivateNavbar