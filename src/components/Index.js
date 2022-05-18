import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Container, Form, Button } from 'react-bootstrap';

const Index = () => {

    const navigate = useNavigate();

    return( 
    
        <Container>

            <div>Página inicial (Bienvenida)

                <Button variant="primary" type="submit" onClick={ () => { navigate('/login') }}>
                        Login
                </Button>

            </div>
        
        </Container>
    
    );
};

export default Index;