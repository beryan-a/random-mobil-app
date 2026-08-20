import { useState, useEffect } from "react";

export const usePlayerStats = (score, rowsCleared) => {

  const [highScore, setHighScore] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    const player = JSON.parse(
      localStorage.getItem("player")
    );

    if (player) {
      setHighScore(player.highScore);
      setTotalRows(player.totalRowsCleared);
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  useEffect(() => {
    if (rowsCleared > 0) {
      setTotalRows(prev => prev + rowsCleared);
    }
  }, [rowsCleared]);

  return [
    highScore,
    totalRows,
    setHighScore,
    setTotalRows
  ];
};