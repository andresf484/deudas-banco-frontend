import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Container, Form, Button } from 'react-bootstrap';

const Dashboard = () => {

    const navigate = useNavigate();

    return(
    
        <div>Dashboard (Autenticado)

        <Button variant="primary" type="submit" onClick={ () => { navigate('/logout') }}>
            Logout
        </Button>

    </div>
    
    );
};

export default Dashboard;