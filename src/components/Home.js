import { useNavigate } from "react-router-dom";
import { Button, Container, Form, ListGroup } from "react-bootstrap"

export const Home = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <h1 className="mt-4">Simulación de gestión de pedidos de comida rápida</h1>
            <h5>(Conexión en tiempo real cliente-servidor)</h5>
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
                    <h5>Los pedidos se reparten en las mesas disponibles de cocina para su preparación</h5>
                    <Form.Select className="selectHome" aria-label="Default select example">
                        <option>Seleccione una mesa</option>
                        <option value="1">Mesa 1</option>
                        <option value="2">Mesa 2</option>
                        <option value="3">Mesa 3</option>
                    </Form.Select>
                    <Button className="buttonHome mt-2" type="submit">
                        Ingresar
                    </Button>

                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}