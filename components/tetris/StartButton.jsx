import { StyledStartButton } from "@/components/tetris/styles/StyledStartButton";

function StartButton({ callback , text}) {
  return (
    <StyledStartButton onClick={callback}> {/*tuşa basılınca start game çalışacak*/}
        {text}
    </StyledStartButton>
  );
}

export default StartButton;