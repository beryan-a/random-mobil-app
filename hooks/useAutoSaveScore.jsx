import { useEffect } from "react";

export const useAutoSaveScore = (
    gameOver,
    saveScore
) => {

    useEffect(() => {
        if (gameOver) {
            saveScore();
        }
    }, [gameOver]);

};