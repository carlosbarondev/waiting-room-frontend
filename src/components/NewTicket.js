import { Button } from "react-bootstrap"

export const NewTicket = () => {
    return (
        <div className="vh-100 centerAll flex-column" style={{ "backgroundColor": "#6951F0" }}>
            <h1 className="mb-5" style={{ "color": "white" }}><strong>Cargando...</strong></h1>
            <Button className="mt-5" variant="secondary">Crear nuevo pedido</Button>
        </div>
    )
}