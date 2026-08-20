import React from 'react';
import  StyledCell  from '@/components/tetris/styles/StyledCell';
import { TETROMINOS } from '@/helpers/tetrominos';

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color}>
    {/* {console.log('rerender cell')} */}
  </StyledCell>
);

export default React.memo(Cell); //memo sadece değişen hücreler olduğuda yeniden render eder.
