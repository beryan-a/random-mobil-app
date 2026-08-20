//IMPORTLAR
import { useState , useEffect } from 'react';

import { createStage, checkCollision } from '@/helpers/gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from '@/components/tetris/styles/StyledTetris';

// Custom Hooks
import { useInterval } from '@/hooks/useInterval';
import { usePlayer } from '@/hooks/usePlayer';
import { useStage } from '@/hooks/useStage';
import { useGameStatus } from '@/hooks/useGameStatus';
import { usePlayerStats } from "@/hooks/usePlayerStats";
import { useSaveScore } from "@/hooks/useSaveScore";
import { useLogout } from "@/hooks/useLogout";
import { useGameControl } from "@/hooks/useGameControl";
import { useGameMovement } from "@/hooks/useGameMovement";
import { useAutoSaveScore } from "@/hooks/useAutoSaveScore";

// Components
import Stage from '@/components/tetris/Stage';
import Display from '@/components/tetris/Display';
import StartButton from '@/components/tetris/StartButton';
import SpeedSlider from '@/components/tetris/SpeedSlider';
import NextPiece from "@/components/tetris/NextPiece";
import PauseButton from '@/components/tetris/PauseButton';

import { useNavigate } from "react-router-dom";
import { StyledStartButton } from '@/components/tetris/styles/StyledStartButton';
import { StyledPauseButton } from '@/components/tetris/styles/StyledPauseButton';
import { View } from 'react-native';

/**
 * oyun iki şey sayesinde ilerliyor: keyborad eventleri(tuşlar) ve setInterval(timer) fonksiyonu. 
 */
const Tetris = () => {
  /**
   * başlangıç statelerini react componente ait dahili memory alanlarında tuttar
   */
  
  

  const {saveScore} = useSaveScore(); //{} obje

  const {logout} = useLogout(); //{} obje

  // Custom Hooks
  const [player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino] = usePlayer(); 
  /**
   * player : playerın pozisyonu ve şekli
   * updatePlayerPos : playerın pozisyonunu güncellemek için
   * resetPlayer : playerı resetlemek için (yeni block oluşturmak için)
   * playerRotate : playerı döndürmek için
   */

  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer); // useStage ile oyuncunun yere çarpıp çarpadığını kontrol ediyoruz.

  const [score, setScore, rows, setRows] = useGameStatus(rowsCleared); // score - level - rows //level removed

  const [highScore, totalRows, setHighScore, setTotalRows ] = usePlayerStats(score, rowsCleared)

  const [speed, setSpeed] = useState(1000);

  const { dropTime, setDropTime, gameOver, setGameOver, gameStarted, isPaused, togglePause, startGame } = useGameControl(speed, setStage, resetPlayer, setScore, setRows, createStage );

  const { move, drop, keyUp } = useGameMovement(player, stage, updatePlayerPos, playerRotate, setGameOver, setDropTime, gameOver, speed);

  const navigate = useNavigate();
  

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);


useAutoSaveScore(gameOver, saveScore); //oyun bitince dbde skor güncellenmesi
  
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)} // tuşa basınca e bize tuşun keyCode'unu veriyor. move fonksiyonu ile tuşa basıldığında ne olacağını belirliyoruz.
      onKeyUp={keyUp} //user tuşu bırakınca bir daha intervale bırakıyoruz.
    >
      <StyledTetris>
        <Stage stage={stage} />
        <View>
          {gameOver ? (
            <>
            <Display gameOver={gameOver} text="Game Over" />
            <Display text={`Score: ${score}`} />
            <StyledStartButton onClick={() => navigate("/leaderboard")}>
                Leaderboard
            </StyledStartButton>
            </>
          ) : (
            <View>
              <Display text={`High Score: ${highScore}`} /> {/*highest score in db */}
              <Display text={`Total Rows: ${totalRows}`} />

              <Display text={`Score: ${score}`} />
  
              <Text>Next Piece</Text>
              <NextPiece tetromino={nextTetromino} />
              {/* <Display text={`Level: ${level}`} /> */}
              <SpeedSlider speed={speed} onSpeedChange={setSpeed}/>
              {gameStarted ? 
              (<PauseButton callback={togglePause} isPaused={isPaused} />):(<></>)}
            </View>
          )}
          <StartButton callback={startGame} text={gameStarted ? "RESET GAME" : "START GAME"} />

          <StyledPauseButton onClick={()=> logout(gameStarted, gameOver)}>
            Logout
          </StyledPauseButton>

        </View>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};
export default Tetris;