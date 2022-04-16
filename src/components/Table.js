import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { Button, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";

export const Table = () => {

    const { table } = useParams();

    const [buttonState, setButtonState] = useState(true);
    const [order, setOrder] = useState(null);
    const [pending, setPending] = useState(null);
    const [checking, setChecking] = useState(false);

    useEffect(() => {

        const socket = socketIOClient(process.env.REACT_APP_NODE, { transports: ['websocket'] });

        socket.on('connect', () => {
            setButtonState(false);
        });

        socket.on('disconnect', () => {
            setButtonState(true);
        });

        socket.on('pending-orders', (pending) => {
            setPending(pending.filter(order => order.table === null));
            setChecking(true);
        });

        socket.emit('attend-order', { table }, (payload) => {
            if (!payload.ok) {
                setOrder("Ninguno");
            } else {
                setOrder(payload.order.number);
            }
        });

    }, [table]);

    const handleClick = () => {

        const socket = socketIOClient(process.env.REACT_APP_NODE, { transports: ['websocket'] });

        if (order !== "Ninguno") {

            socket.emit('ready-order', { order }, (payload) => {
                if (!payload.ok) {
                    return Swal.fire('Error', `${payload.msg}`, 'error');
                }
            });

            socket.emit('attend-order', { table }, (payload) => {
                if (!payload.ok) {
                    setOrder("Ninguno");
                } else {
                    setOrder(payload.order.number);
                }
            });

        } else {
            if (pending.length !== 0) {
                socket.emit('attend-order', { table }, (payload) => {
                    if (!payload.ok) {
                        setOrder("Ninguno");
                    } else {
                        setOrder(payload.order.number);
                    }
                });
            } else {
                return Swal.fire('No hay ningún pedido', ``, 'info');
            }
        }


    }

    return (
        (table === "1" || table === "2" || table === "3")
            ? checking && <Container>
                <h1 className="mt-4" style={{ "fontSize": "55px" }}>Mesa {table}</h1>
                <hr />
                <Row>
                    <Col xs={8} className="centerAll flex-column" style={{ "backgroundColor": "#00FA9A", "height": "200px" }}>
                        <h1 style={{ "fontSize": "50px" }}><strong>Preparar pedido</strong></h1>
                        <h1 style={{ "fontSize": "50px" }}><strong>{order}</strong></h1>
                    </Col>
                    <Col xs={4} className="centerAll flex-column" style={{ "backgroundColor": "#E9967A", "height": "200px" }}>
                        <h1 style={{ "fontSize": "50px" }}><strong>Cola</strong></h1>
                        <h1 style={{ "fontSize": "50px" }}><strong>{pending.length >= 0 ? pending.length : 0}</strong></h1>
                    </Col>
                    <Button
                        className="mt-4"
                        onClick={handleClick}
                        disabled={buttonState}
                        variant={order === "Ninguno" ? "danger" : "success"}
                        style={{ "height": "56px", "fontSize": "22px" }}
                    >
                        {order === "Ninguno" ? "Atender siguiente pedido" : "Pedido completado"}
                    </Button>
                </Row>
            </Container>
            : <Navigate to="/" replace={true} />
    )
}