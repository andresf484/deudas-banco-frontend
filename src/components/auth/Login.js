import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api';
import AuthContext from "../../context/AuthContext";

const Login = () => {

    const { setAuth } = useContext(AuthContext);

    // Estado para capturar los imputs del formulario
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    // Estado para "loading" cuando la página esté lenta
    const [loading, setLoading] = useState(false);

    //Redireccionar luego de enviar los datos al backend
    const navigate = useNavigate();

    const handleChange = e => {
        //console.log(e.target.name, e.target.value);

        // Cuando los imputs sean tipeados, se actalizan en el useState
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    // Manejar el evento submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir refresco de página del evento submit

        // El objeto que se le va enviar al backend
        //console.log(login);

        //Antes de enviar el formulario
        setLoading(true);

        await fetch(`${server}/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(login)
        }).then(async (resp)=>{ 
            
            if(resp.status === 400){
                //console.log('Status 400: Usuario y/o contraseña invalido');
                localStorage.removeItem("token");
                setAuth(false);

                // Cuando halla terminado de guardar
                setLoading(false);

                navigate("/login");
            }

            if(resp.status === 201){
                // Se retorna el json con la información
                let json = await resp.json();

                // Cuando halla terminado de guardar
                setLoading(false);

                //console.log('Login correcto, se recibe el token');
                //console.log(json.token);

                // Guardar el token en el localStorage
                localStorage.setItem('token', json.token);
                setAuth(true);
                // Hacer la redirección, usando la función navigate
                navigate("/");
            }
        }).catch(error=>{
            console.error(error);
        })

    };


    return (

    <Container fluid="md">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control 
                    name="email"
                    type="email" 
                    placeholder="Ingrese correo"
                    onChange={handleChange}
                />
                <Form.Text className="text-muted">
                Correo válido requerido.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    name="password"
                    type="password" 
                    placeholder="Ingrese contraseña"
                    onChange={handleChange}
                />
            </Form.Group>


            { loading ?

                <Button variant="primary" type="submit" disabled>
                    <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    
                    <span style={{ margin: '0', paddingLeft: '5px' }} > 
                        Loading...
                    </span>
                </Button>

            : 

                <Button variant="primary" type="submit" disabled={ !login.email || !login.password }>
                    Iniciar sesión
                </Button>

            }

        </Form>
    </Container>

    );
};

export default Login;