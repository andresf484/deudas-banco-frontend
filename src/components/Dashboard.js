import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Container, Button } from 'react-bootstrap';

const Dashboard = () => {

    const navigate = useNavigate();

    return(
    
        <div>
    
            <Container>

                <Breadcrumb active>
                    <Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>
                </Breadcrumb>

                <h2>Dashboard (Autenticado)</h2>

                <br />

                <Button variant="primary" type="submit" onClick={ () => { navigate('/logout') }}>
                    Logout
                </Button>

            </Container>

        </div>

    );
};

export default Dashboard;