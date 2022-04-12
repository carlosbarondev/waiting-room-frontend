import {
    Routes,
    Route,
} from "react-router-dom";
import { PublicScreen } from "../components/PublicScreen";
import { Order } from "../components/Order";
import { Table } from "../components/Table";
import { Home } from "../components/Home";

export const AppRouter = () => {

    return (
        <Routes>
            <Route
                path="publica"
                element=
                {
                    <PublicScreen />
                }
            />
            <Route
                path="nuevo-pedido"
                element=
                {
                    <Order />
                }
            />
            <Route
                path="mesa/:table"
                element=
                {
                    <Table />
                }
            />
            <Route
                path="/*"
                element=
                {
                    <Home />
                }
            />
        </Routes>
    )
}