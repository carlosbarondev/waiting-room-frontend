import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { Button } from "react-bootstrap"

export const Order = () => {

    const [buttonState, setButtonState] = useState(true);
    const [lastOrder, setLastOrder] = useState(null);

    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_NODE, { transports: ['websocket'] });
        socket.on('connect', () => {
            setButtonState(false);
        });
        socket.on('disconnect', () => {
            setButtonState(true);
        });
        socket.on('last-order', (last) => {
            setLastOrder(last);
        });
    }, []);

    const createOrder = () => {
        const socket = socketIOClient(process.env.REACT_APP_NODE, { transports: ['websocket'] });
        socket.emit('next-order', null, (order) => {
            setLastOrder(order);
        });
    }

    return (
        <div className="vh-100 centerAll flex-column" style={{ "backgroundColor": "#6951F0" }}>
            <h1 className="mb-5" style={{ "color": "white", "fontSize": "48px" }}><strong>{lastOrder ? `Creado Pedido ${lastOrder}` : "Cargando..."}</strong></h1>
            <Button
                disabled={buttonState}
                className="mt-5"
                variant="secondary"
                onClick={createOrder}
                size="lg"
            >
                Crear nuevo pedido
            </Button>
        </div>
    )
}