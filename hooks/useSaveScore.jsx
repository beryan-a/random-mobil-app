export const useSaveScore = () => {

    const saveScore = async (
        score,
        rows,
        setHighScore,
        setTotalRows
    ) => {

        const player = JSON.parse(
            localStorage.getItem("player")
        );

        if (!player) return;

        try {

            const response = await fetch(
                `http://localhost:8080/api/players/${player.id}/score?score=${score}&rows=${rows}`,
                {
                    method: "PUT"
                }
            );

            const updatedPlayer =
                await response.json();

            localStorage.setItem(
                "player",
                JSON.stringify(updatedPlayer)
            );

            setHighScore(
                updatedPlayer.highScore
            );

            setTotalRows(
                updatedPlayer.totalRowsCleared
            );

        } catch (error) {
            console.error(error);
        }
    };

    return {saveScore}; //{} obje 
};