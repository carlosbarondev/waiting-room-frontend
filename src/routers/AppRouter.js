import {
    Routes,
    Route,
} from "react-router-dom";
import { PublicScreen } from "../components/PublicScreen";
import { Order } from "../components/Order";
import { Desktop } from "../components/Desktop";
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
                path="escritorio"
                element=
                {
                    <Desktop />
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