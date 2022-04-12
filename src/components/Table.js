import { Navigate, useParams } from "react-router-dom";

export const Table = () => {

    const { table } = useParams();

    return (
        (table === "1" || table === "2" || table === "3")
            ? <div>Mesa {table}</div>
            : <Navigate to="/" replace={true} />
    )
}