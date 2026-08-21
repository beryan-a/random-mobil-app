import Cell from "@/components/tetris/Cell";
import React from "react";
import { View, StyleSheet } from "react-native";

function NextPiece({ tetromino }) {
  const previewGrid = Array(4)
    .fill(null)
    .map(() => Array(4).fill(0));


  
  tetromino.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      previewGrid[y][x] = value; //tetrominoyu 4*4luk girde yerleştir preview için
    });
  });


  return (
    <View style={styles.container}>
      {previewGrid.map((row, y) =>
        row.map((cell, x) => (
          <View 
            style={styles.cellWrapper}
            key={`${y}-${x}`} //key: react görür, tarayıcıya gönderilmez React sadece render sırasında hangi elemanın hangisi olduğunu takip etmek için kullanıyor. Cellin kimliğini temsil eder.
          >
            <Cell type={cell}/>
          </View>
        ))
      )}
    </View>
  );
}

export default NextPiece;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 1,
    width: 101, // 4 * 24px + 3 * 1px gap + border payı
    height: 101,
    backgroundColor: '#111111',
    borderWidth: 2,
    borderColor: '#333333',
    marginBottom: 20,
    alignSelf: 'center',
  },
  cellWrapper: {
    width: 23.5,
    height: 23.5,
  },
});