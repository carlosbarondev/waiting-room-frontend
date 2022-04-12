import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { Carousel, Col, ListGroup, Row } from "react-bootstrap"

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
                <div className="centerAll" style={{ "backgroundColor": "grey", "color": "white", "height": "70px" }}>
                    <h1>En preparación...</h1>
                </div>
                <ListGroup className="text-center">
                    {
                        pending.map(order => (
                            <ListGroup.Item key={order.number} className="border-0"><h1><strong>{order.number}</strong></h1></ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Col>
            <Col xs={3} className="p-0">
                <div className="centerAll" style={{ "backgroundColor": "green", "color": "white", "height": "70px" }}>
                    <h1>Listo</h1>
                </div>
                <ListGroup className="text-center">
                    {
                        ready.map(order => (
                            <ListGroup.Item key={order.number} className="border-0"><h1><strong>{order.number}</strong></h1></ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Col>
            <Col xs={6} className="mt-5 d-flex justify-content-center">
                <Carousel className="carouselHome mt-5">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/assets/promo1.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/assets/promo2.jpg"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/assets/promo3.jpg"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </Col>
        </Row>
    )
}