import Cell from "@/components/tetris/Cell";
import { StyleSheet } from "nativewind";

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
          <Cell 
            style={styles.cell}
            key={`${y}-${x}`} //key: react görür, tarayıcıya gönderilmez React sadece render sırasında hangi elemanın hangisi olduğunu takip etmek için kullanıyor. Cellin kimliğini temsil eder.
            type={cell}
          />
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
    width: 100,
    height: 100,
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#333',
    marginBottom: 20,
  },
  // 4x4 Grid için hücre stili:
  // 100px içinde 4 sütun için her hücre yaklaşık (100 - 3*1) / 4 ≈ 24px olur
  cell: {
    width: 24,
    height: 24,
    backgroundColor: '#222', // Örnek hücre arka planı
  },
  
})