import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Cell from '@/components/tetris/Cell';

export default function Stage({ stage }) {
  const { width: screenWidth } = useWindowDimensions();

  // stage matrisinin genişlik ve yüksekliği
  const stageWidthCount = stage[0]?.length || 12;

  // Mobilde ekranın %65'i veya max 320px gride ayırıyoruz
  const boardWidth = Math.min(screenWidth * 0.65, 320);
  const cellSize = Math.floor(boardWidth / stageWidthCount);

  return (
    <View style={[styles.container, { width: cellSize * stageWidthCount + 4 }]}>
      {stage.map((row, y) => (
        <View key={`row-${y}`} style={styles.row}>
          {row.map((cell, x) => (
            <View
              key={`cell-${y}-${x}`}
              style={{
                width: cellSize,
                height: cellSize,
              }}
            >
              <Cell type={cell[0]} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    borderWidth: 2,
    borderColor: '#333333',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});