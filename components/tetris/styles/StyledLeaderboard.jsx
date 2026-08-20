import styled from "styled-components";

export const StyledLeaderboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
    background-color: papayawhip;;


  h1 {
    margin-bottom: 20px;
    color: #cc6c8c;
  }

  table {
    border-collapse: collapse;
    width: 700px;
    
  }

  th,
  td {
    border: 1px solid #cc6c8c;
    padding: 12px;
    text-align: center;
  }

  th {
    font-size: 20px;
  }

  tr:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;