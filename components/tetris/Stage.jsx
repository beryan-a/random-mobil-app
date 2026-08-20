// import React from 'react';
import {StyledStage} from '@/components/tetris/styles/StyledStage'
import Cell from '@/components/tetris/Cell';

function Stage({ stage }) {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStage>
  );
}

export default Stage;