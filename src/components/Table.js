import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { Button, Container } from "react-bootstrap";
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
            setPending(pending);
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
                console.log(payload)
                if (!payload.ok) {
                    setOrder("Ninguno");
                } else {
                    setOrder(payload.order.number);
                }
            });

        } else {
            if (pending.length !== 0) {
                socket.emit('attend-order', { table }, (payload) => {
                    console.log(payload)
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
                <h1 className="mt-4">Mesa {table}</h1>
                <hr />
                <h1>Preparar pedido: {order}</h1>
                <h1>Cola: {pending.length - 1 >= 0 ? pending.length - 1 : 0}</h1>
                <Button
                    onClick={handleClick}
                    disabled={buttonState}
                >
                    {order === "Ninguno" ? "Atender siguiente pedido" : "Pedido completado"}
                </Button>
            </Container>
            : <Navigate to="/" replace={true} />
    )
}