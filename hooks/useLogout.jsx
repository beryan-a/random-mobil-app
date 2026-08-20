import { useRouter } from 'expo-router';
export const useLogout = () => {

    const router = useRouter();
    
    const logout = (gameStarted, gameOver) => {

        if (gameStarted && !gameOver) {

            const confirmed = window.confirm(
                "Current game progress will be lost. Are you sure you want to logout?"
            );

            if (!confirmed) return;
        }

        localStorage.removeItem("player");

        router.push("/");
    };

    return {logout};
};