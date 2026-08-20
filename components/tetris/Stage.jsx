import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

export default function Stage({ width, height, stage }) {
  const { width: screenWidth } = useWindowDimensions();

  // CSS'teki max-width: 25vw mantığı: Ekran genişliğinin %25'i
  const stageWidth = screenWidth * 0.25; 
  // Her bir hücrenin kare (1:1) genişlik/yükseklik değeri
  const cellSize = Math.floor(stageWidth / width);

  return (
    <View style={[styles.container, { width: cellSize * width }]}>
      {/* 
        stage matrisiniz (row x col) varsa hücreleri render ederken 
        her Cell bileşenine cellSize değerini verebilirsiniz:
      */}
      {stage.map((row, y) =>
        row.map((cell, x) => (
          <View
            key={`${y}-${x}`}
            style={[
              styles.cell,
              {
                width: cellSize,
                height: cellSize,
                backgroundColor: cell[0] === 0 ? '#000' : 'cyan', // örnek hücre rengi
              },
            ]}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#333',
    // gap: 1, // Eğer hücreler arasına 1px boşluk isterseniz ekleyebilirsiniz
  },
  cell: {
    borderWidth: 1,
    borderColor: '#222',
  },
});