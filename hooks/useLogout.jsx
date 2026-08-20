import { useNavigate } from "react-router-dom";

export const useLogout = () => {

    const navigate = useNavigate();

    const logout = (gameStarted, gameOver) => {

        if (gameStarted && !gameOver) {

            const confirmed = window.confirm(
                "Current game progress will be lost. Are you sure you want to logout?"
            );

            if (!confirmed) return;
        }

        localStorage.removeItem("player");

        navigate("/");
    };

    return {logout};
};