import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Breadcrumb, Container, Table, Form, Button } from 'react-bootstrap';

/**********************Importacion de Componentes**************************/
import { server } from '../../context/Api';
import AuthContext from "../../context/AuthContext";

const DetalleDeuda = () => {

    const { setAuth } = useContext(AuthContext);

    let params = useParams();
    //console.log(params.slug);

    //Redireccionar luego de enviar los datos al backend
    const navigate = useNavigate();

    // Objeto original desde el fetch
    const [detalleDeuda, setDetalleDeuda] = useState({});

    // Si voy a a pagar a cuotas o total
    const [metodoPago, setMetodoPago] = useState({});

    // Lo que voy a pagar
    const [detallePago, setDetallePago] = useState({
        valor_pago: '',
        cuotas_a_pagar: ''
    });


    useEffect(() => {

        let data = { 
            deuda_id: params.id
        };
        //console.log(data);

        fetch(`${server}/detalle-deuda`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }).then(async (resp)=>{ 
            
            // Middleware - Inicio

            if(resp.status === 401){
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("Intente autenticarse nuevamente");
                navigate("/login");
            }

            if(resp.status === 404){
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("404");
                navigate("/login");
            }

            if(resp.status === 403){
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("403");
                navigate("/");
            }
            
            // Middleware - Fin

            if(resp.status === 500){
                window.alert("500");
                navigate("/");
            } 

            if(resp.status === 200){
                // Se retorna el json con la información
                let json = await resp.json();

                //console.log(json);

                setDetalleDeuda(json);

            }
        }).catch(error=>{
            console.error(error);
        })

    }, [])

    const handleMetodoPago = (e) => {
        let obj = { ...metodoPago, [e.target.name]: e.target.value }
        //setMetodoPago(obj);
        //console.log(obj.metodo_pago);

        if (obj.metodo_pago === 'completo') {

            //console.log(detalleDeuda);

            setDetallePago({
                valor_pago: detalleDeuda.deuda_pendiente,
                cuotas_a_pagar: detalleDeuda.cuotas_pendientes
            });

        } else { // parcial

            setDetallePago({
                valor_pago: '',
                cuotas_a_pagar: ''
            });

        }

    }

    const handleChange = (e) => {
        e.preventDefault();
        let obj = { ...detallePago, [e.target.name]: e.target.value }

        //console.log(obj + ' Validacion');
        //console.log('Valor pago ingresado: '+obj.valor_pago+', cuotas a pagar: '+obj.cuotas_a_pagar);

        let calculo = (detalleDeuda.deuda_pendiente / detalleDeuda.cuotas_pendientes) * obj.cuotas_a_pagar;
        //console.log('Calculo: '+calculo);
        
        setDetallePago({
            valor_pago: calculo,
            cuotas_a_pagar: parseInt(obj.cuotas_a_pagar)
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = { // Armado del objeto que se va enviar al backend
            deuda_id: params.id,
            valor_pago: detallePago.valor_pago,
            cuotas_a_pagar: detallePago.cuotas_a_pagar
        }
        //console.log(data);

        fetch(`${server}/abono-deuda`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }).then(async (resp)=>{ 

            // Middleware - Inicio

            if(resp.status === 401){
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("Intente autenticarse nuevamente");
                navigate("/login");
            }

            if(resp.status === 404){
                localStorage.removeItem("token");
                setAuth(false);
                window.alert("404");
                navigate("/login");
            }

            if(resp.status === 403){
                //localStorage.removeItem("token");
                //setAuth(false);
                window.alert("403");
                navigate("/");
            }
            
            // Middleware - Fin

            if(resp.status === 500){
                window.alert("500");
                navigate("/");
            } 
            
            if(resp.status === 400){
                localStorage.removeItem("token");
                setAuth(false);
                //navigate("/login");
            }

            if(resp.status === 201){
                // Se retorna el json con la información
                let json = await resp.json();

                //console.log(json);

                setDetalleDeuda(json);

            }
        }).catch(error=>{
            console.error(error);
        })

    }

    return (

    <div>

        <Container fluid="md">

            <Breadcrumb>
                <Breadcrumb.Item onClick={ () => { navigate('/') }}>Inicio</Breadcrumb.Item>
                <Breadcrumb.Item onClick={ () => { navigate('/bancos') }}>
                    Lista bancos
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={ () => { navigate('/deudas/'+detalleDeuda.banco_slug) }}>
                    Deudas banco: {detalleDeuda.banco_slug}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Detalle deuda (_id): {params.id}</Breadcrumb.Item>
            </Breadcrumb>

            <h2>Detalle deuda (_id): {params.id} - Banco: {detalleDeuda.banco_slug} </h2>

            <br />

            <Table striped bordered hover>

                <thead>
                </thead>

                <tbody>
                <tr>
                    <td>He pagado (pago acumulado)</td>
                    <td>{detalleDeuda.pago_acumulado}</td>
                </tr>
                <tr>
                    <td>Cuotas pendientes</td>
                    <td>{detalleDeuda.cuotas_pendientes}</td>
                </tr>
                <tr>
                    <td>Deuda pendiente</td>
                    <td>{detalleDeuda.deuda_pendiente}</td>
                </tr>
                </tbody>

                <tfoot>
                </tfoot>

            </Table>

            <br />

            <h2>Pagos</h2>

            <Form>

                <Form.Group className="mb-3">
                    <Form.Label>Opciones de pago:</Form.Label>
                    <br />
                    <Form.Check
                    onClick={handleMetodoPago}
                    inline
                    type='radio'
                    id={`default-radio`}
                    name="metodo_pago"
                    label={`Pago parcial`}
                    value='parcial'
                    />

                    <Form.Check
                    onClick={handleMetodoPago}
                    inline
                    type='radio'
                    id={`default-radio`}
                    name="metodo_pago"
                    label={`Pago completo`}
                    value='completo'
                    />
                </Form.Group>

                <Row>
                    <Col>

                        <Form.Group className="mb-3">
                            <Form.Label>Valor a pagar</Form.Label>
                            <Form.Control 
                                name="valor_pago"
                                type="number" 
                                placeholder="Valor del pago según cuotas"
                                onChange={handleChange}
                                value={detallePago.valor_pago}
                                disabled
                            />
                            <Form.Text className="text-muted">
                                Dato calculado automáticamente
                            </Form.Text>
                        </Form.Group>

                    </Col>
                    <Col>

                        <Form.Group className="mb-3">
                            <Form.Label>Cuotas a pagar</Form.Label>
                            <Form.Control 
                                name="cuotas_a_pagar"
                                type="number" 
                                placeholder="Ingrese las cuotas a pagar"
                                onChange={handleChange}
                                value={detallePago.cuotas_a_pagar}
                                min="1"
                                max={detalleDeuda.cuotas_pendientes}
                                /*disabled={ metodoPago.metodo_pago === 'completo' ? true : false }*/
                            />
                            <Form.Text className="text-muted">
                            Solo números enteros
                            </Form.Text>
                        </Form.Group>

                    </Col>
                </Row>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Pagar
                </Button>

            </Form>

        </Container>

    </div>

    );
};

export default DetalleDeuda;