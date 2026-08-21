import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TETROMINOS } from '@/helpers/tetrominos';

const Cell = ({ type }) => {
  const color = TETROMINOS[type]?.color || '0, 0, 0';
  const isFilled = type !== 0;

  return (
    <View
      style={[
        styles.cell,
        {
          backgroundColor: `rgba(${color}, 0.8)`,
          borderWidth: isFilled ? 4 : 0,
          borderBottomColor: `rgba(${color}, 0.1)`,
          borderRightColor: `rgba(${color}, 1)`,
          borderTopColor: `rgba(${color}, 1)`,
          borderLeftColor: `rgba(${color}, 0.3)`,
        },
      ]}
    />
  );
};

export default React.memo(Cell);

const styles = StyleSheet.create({
  cell: {
    // Hücrenin genişlik/yükseklik boyutları Stage veya NextPiece grid kapsayıcısından 
    // flex veya sabit px (örn: cellSize) olarak yönetilir.
    flex: 1,
    aspectRatio: 1, // Hücrenin her zaman kare kalmasını sağlar
  },
});