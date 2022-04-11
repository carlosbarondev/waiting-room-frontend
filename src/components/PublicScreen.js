import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { Col, Image, ListGroup, Row } from "react-bootstrap"

export const PublicScreen = () => {

    const [ready, setReady] = useState("");
    const [pending, setPending] = useState("");
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_NODE, { transports: ['websocket'] });
        socket.on("current-status", data => {
            setReady(data);
        });
        socket.on("pending-tickets", data => {
            setPending(data);
            setChecking(true);
        });
    }, []);

    return (
        checking && <Row className="vh-100 m-0">
            <Col xs={3} className="p-0">
                <h1 className="centerAll" style={{ "backgroundColor": "grey", "color": "white" }}>En preparación...</h1>
                <ListGroup className="text-center">
                    {
                        pending.map(order => (
                            <ListGroup.Item key={order.number} className="border-0"><h1><strong>{order.number}</strong></h1></ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Col>
            <Col xs={3} className="p-0">
                <h1 className="centerAll" style={{ "backgroundColor": "green", "color": "white" }}>Listo</h1>
                <ListGroup className="text-center">
                    {
                        ready.map(order => (
                            <ListGroup.Item key={order.number} className="border-0"><h1><strong>{order.number}</strong></h1></ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Col>
            <Col xs={6} className="centerAll">
                <Image src="https://www.ccrincondelavictoria.com/wp-content/uploads/2020/07/MCDONALDS.jpg" fluid />
            </Col>
        </Row>
    )
}