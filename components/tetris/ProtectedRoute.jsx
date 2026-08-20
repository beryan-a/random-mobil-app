import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const player = localStorage.getItem("player");

    if(!player){
        return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute;