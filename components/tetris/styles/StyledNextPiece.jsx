import styled from "styled-components";

export const StyledNextPiece = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);

  gap: 1px;

  width: 100px;
  height: 100px;

  background: #111;
  border: 2px solid #333;

  margin-bottom: 20px;
`;