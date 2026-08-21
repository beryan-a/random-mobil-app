import { useState, useEffect } from 'react';

//skoru bellekte tutup ve en yüksek skoru güncelleyeceğiz 

export const usePlayerStats = (score, rowsCleared) => {
  const [highScore, setHighScore] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  useEffect(() => {
    setTotalRows((prev) => prev + rowsCleared);
  }, [rowsCleared]);

  return [highScore, totalRows, setHighScore, setTotalRows];
};