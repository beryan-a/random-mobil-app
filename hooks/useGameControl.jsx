import { useState, useEffect } from "react";

export const useGameControl = (
  speed,
  setStage,
  resetPlayer,
  setScore,
  setRows,
  createStage
) => {

  const [dropTime, setDropTime] = useState(null); //başlangıçta null (oyun başlamadan drop olmasın-zamanlayıcı çalışmaya başlamadı) //oyunu durduran şey setDropTime(null);
  const [gameOver, setGameOver] = useState(false); //oyun başlangıçta false (oyun başlamadan game over olmasın diye)
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);//for pause button 

  useEffect(() => {
    if (!gameOver && dropTime !== null) {
      setDropTime(speed);
    }
  }, [speed]);

  const togglePause = () => {

    if (gameOver) return;

    if (isPaused) {
      setDropTime(speed);
      setIsPaused(false);
    } else {
      setDropTime(null);
      setIsPaused(true);
    }
  };

  const startGame = () => {

    setStage(createStage());

    resetPlayer();

    setScore(0);
    setRows(0);

    setDropTime(speed);

    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
  };

  return {
    dropTime,
    setDropTime,

    gameOver,
    setGameOver,

    gameStarted,

    isPaused,

    togglePause,
    startGame
  };
};