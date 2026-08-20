import Cell from "./Cell";
import { StyledNextPiece } from "./styles/StyledNextPiece";
import React from 'react'

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
    <StyledNextPiece>
      {previewGrid.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${y}-${x}`} //key: react görür, tarayıcıya gönderilmez React sadece render sırasında hangi elemanın hangisi olduğunu takip etmek için kullanıyor. Cellin kimliğini temsil eder.
            type={cell}
          />
        ))
      )}
    </StyledNextPiece>
  );
}

export default NextPiece;