import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Helpers
import { createStage } from '@/helpers/gameHelpers';

// Custom Hooks
import { useInterval } from '@/hooks/useInterval';
import { usePlayer } from '@/hooks/usePlayer';
import { useStage } from '@/hooks/useStage';
import { useGameStatus } from '@/hooks/useGameStatus';
import { usePlayerStats } from '@/hooks/usePlayerStats';
import { useGameControl } from '@/hooks/useGameControl';
import { useGameMovement } from '@/hooks/useGameMovement';

// Components
import Stage from '@/components/tetris/Stage';
import Display from '@/components/tetris/Display';
import StartButton from '@/components/tetris/StartButton';
import SpeedSlider from '@/components/tetris/SpeedSlider';
import NextPiece from '@/components/tetris/NextPiece';
import PauseButton from '@/components/tetris/PauseButton';

const Tetris = () => {
  // Custom Hooks
  const [player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows] = useGameStatus(rowsCleared);
  const [highScore, totalRows] = usePlayerStats(score, rowsCleared);

  const [speed, setSpeed] = useState(1000);

  const {
    dropTime,
    setDropTime,
    gameOver,
    setGameOver,
    gameStarted,
    isPaused,
    togglePause,
    startGame,
  } = useGameControl(speed, setStage, resetPlayer, setScore, setRows, createStage);

  const { move, drop } = useGameMovement(
    player,
    stage,
    updatePlayerPos,
    playerRotate,
    setGameOver,
    setDropTime,
    gameOver,
    speed
  );

  // Oyun ana döngüsü
  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
      <View style={styles.gameArea}>
        {/* Oyun Tahtası */}
        <Stage stage={stage} />

        {/* Bilgi & Kontrol Paneli */}
        <View style={styles.sidePanel}>
          {gameOver ? (
            <>
              <Display gameOver={gameOver} text="Game Over" />
              <Display text={`Score: ${score}`} />
            </>
          ) : (
            <>
              <Display text={`High: ${highScore}`} />
              <Display text={`Score: ${score}`} />
              <Display text={`Lines: ${totalRows}`} />

              <Text style={styles.sectionLabel}>Next Piece</Text>
              <NextPiece tetromino={nextTetromino} />

              <SpeedSlider speed={speed} onSpeedChange={setSpeed} />

              {gameStarted ? (
                <PauseButton callback={togglePause} isPaused={isPaused} />
              ) : null}
            </>
          )}

          <StartButton
            callback={startGame}
            text={gameStarted ? 'RESET GAME' : 'START GAME'}
          />
        </View>
      </View>

      {/* Dokunmatik Yön Butonları */}
      {gameStarted && !gameOver ? (
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => move({ keyCode: 37 })}
          >
            <Text style={styles.controlBtnText}>◀</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlBtn, styles.rotateBtn]}
            onPress={() => playerRotate(stage, 1)}
          >
            <Text style={styles.controlBtnText}>↻</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => move({ keyCode: 39 })}
          >
            <Text style={styles.controlBtnText}>▶</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlBtn, styles.dropBtn]}
            onPress={() => drop()}
          >
            <Text style={styles.controlBtnText}>▼</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default Tetris;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0c',
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
    paddingBottom: 40,
  },
  gameArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    gap: 12,
  },
  sidePanel: {
    flex: 1,
    alignItems: 'center',
  },
  sectionLabel: {
    color: '#ffffff',
    fontFamily: 'monospace',
    fontSize: 14,
    marginBottom: 6,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
    width: '100%',
  },
  controlBtn: {
    width: 60,
    height: 60,
    backgroundColor: '#222222',
    borderWidth: 2,
    borderColor: '#444444',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotateBtn: {
    borderColor: '#cc6c8c',
    backgroundColor: '#331a24',
  },
  dropBtn: {
    borderColor: '#6ccc9c',
  },
  controlBtnText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});