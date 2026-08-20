import styled from "styled-components/native";


export const StyledPauseButton = styled.Pressable`
  background: transparent;
  color: #cc6c8c;

  border: 2px solid black;
  border-radius: 50%;

  width: 50px;
  height: 50px;

  padding: 0;
  margin-bottom: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    filter: invert(54%) sepia(24%) saturate(1120%) hue-rotate(290deg)
        brightness(95%) contrast(88%);
  }
`;