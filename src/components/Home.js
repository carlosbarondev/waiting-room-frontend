import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, ListGroup } from "react-bootstrap"
import Swal from "sweetalert2";

export const Home = () => {

    const navigate = useNavigate();
    const [table, setTable] = useState(null);

    const handleButton = () => {
        if (table) {
            navigate(`mesa/${table}`);
        } else {
            Swal.fire('Seleccione una mesa', ``, 'info');
        }
    }

    return (
        <Container>
            <h1 className="mt-4">Simulación de gestión de pedidos de comida rápida</h1>
            <h5>(Conexión en tiempo real cliente-servidor con WebSockets)</h5>
            <ListGroup className="mt-5">
                <ListGroup.Item className="border-0">
                    <h5>Acceso a las pantallas situadas en la sala de espera</h5>
                    <Button className="buttonHome" onClick={() => navigate("publica")}>
                        Pantalla pública
                    </Button>
                </ListGroup.Item>
                <ListGroup.Item className="mt-3 border-0">
                    <h5>Simula los pedidos realizados por los clientes</h5>
                    <Button className="buttonHome" onClick={() => navigate("nuevo-pedido")}>
                        Crear Pedidos
                    </Button>
                </ListGroup.Item>
                <ListGroup.Item className="mt-3 border-0">
                    <h5>Los pedidos se reparten en las mesas disponibles de la cocina para su preparación</h5>
                    <Form.Select className="selectHome" aria-label="Default select example" onClick={(e) => setTable(e.target.value)}>
                        <option>Seleccione una mesa</option>
                        <option value="1">Mesa 1</option>
                        <option value="2">Mesa 2</option>
                        <option value="3">Mesa 3</option>
                    </Form.Select>
                    <Button className="buttonHome mt-2" onClick={handleButton}>
                        Ingresar
                    </Button>

                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}