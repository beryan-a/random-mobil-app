import { StyledPauseButton } from "./styles/StyledPauseButton";

function PauseButton({ callback, isPaused }) {
  return (
    <StyledPauseButton onClick={callback}>
      <img
        src={isPaused ? "/play.svg" : "/pause.svg"}
        alt={isPaused ? "Play" : "Pause"}
      />
    </StyledPauseButton>
  );
}

export default PauseButton;