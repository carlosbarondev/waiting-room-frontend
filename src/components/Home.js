import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap"

export const Home = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <h1>Programa de Colas</h1>
            <Row>
                <Col>
                    <Button onClick={() => navigate("publica")}>
                        Pantalla pública
                    </Button>
                    <Button onClick={() => navigate("tickets")}>
                        Crear Tickets
                    </Button>
                </Col>
                <Col>
                    <form action="escritorio.html">
                        <input name="escritorio"
                            type="text"
                            className="form-control"
                            placeholder="Escritorio"
                            autoFocus
                            required
                        />
                        <br />
                        <Button type="submit">
                            Ingresar
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}