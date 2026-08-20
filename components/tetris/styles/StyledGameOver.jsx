import styled from 'styled-components/native';

export const StyledGameOver = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    color: #999;
    background: #000;
    position: absolute;
    top: 200px;
    left: calc((100vw / 2) - 75px);
    width: 150px;
    height: 100px;
    z-index: 1000;
    border: 4px solid #333;
    font-family: monospace;
`;