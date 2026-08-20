import React from 'react'
import { StyledSpeedSlider } from './styles/StyledSpeedSlider'

function SpeedSlider({ speed , onSpeedChange }) {
  return (
    <StyledSpeedSlider>
        <h3>Speed: {speed} ms</h3>

        <input 
        type="range"
        min="50"
        max="1500"
        step= "100"
        value={speed}
        onChange={ (e) => onSpeedChange(Number(e.target.value))}
        />
    </StyledSpeedSlider>
  )
}

export default SpeedSlider