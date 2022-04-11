import {
    Routes,
    Route,
} from "react-router-dom";
import { PublicScreen } from "../components/PublicScreen";
import { NewTicket } from "../components/NewTicket";
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
                path="tickets"
                element=
                {
                    <NewTicket />
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