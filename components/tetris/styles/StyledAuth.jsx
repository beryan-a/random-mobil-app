import styled from "styled-components/native";

export const StyledAuthPage = styled.View`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: papayawhip;
`;

export const StyledAuthCard = styled.View`
  width: 350px;

  display: flex;
  flex-direction: column;
  gap: 15px;

  padding: 40px;

  background: white;

  border: 3px solid black;
  border-radius: 20px;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #cc6c8c;
  }

  a {
    text-align: center;
    text-decoration: none;
    color: #cc6c8c;
  }
`;

export const StyledAuthInput = styled.TextInput`
  width: 100%;
  box-sizing: border-box;

  padding: 12px;
  padding-right: 45px;

  border: 2px solid black;
  border-radius: 10px;

  font-size: 1rem;

  outline: none;

  &:focus {
    border-color: #cc6c8c;
  }
`;

export const StyledAuthButton = styled.Pressable`
  padding: 12px;

  border: 2px solid black;
  border-radius: 10px;

  background: #cc6c8c;
  color: white;

  font-weight: bold;

  cursor: pointer;
`;

export const StyledPasswordWrapper = styled.View`
  position: relative;
  width: 100%;
`;

export const StyledEyeButton = styled.Pressable`
  position: absolute;

  top: 50%;
  right: 15px;

  transform: translateY(-50%);

  background: transparent;
  border: none;
  cursor: pointer;

  cursor: pointer;

  padding: 0;

  img {
    width: 24px;
    height: 24px;
  }
`;
