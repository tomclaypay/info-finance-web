import { Slider } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

interface CustomizedSliderProps {
  defaultValue: number
  disabled?: boolean
}

const CustomizedSlider = ({ defaultValue, disabled = true }: CustomizedSliderProps) => {
  const CustomSlider = styled(Slider)({
    flex: 1,
    color: 'primary',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
      backgroundColor: '#2a559c',
    },
    '& .MuiSlider-thumb': {
      display: 'none',
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  })
  return (
    <CustomSlider
      disabled={disabled}
      min={0}
      max={10}
      step={0.01}
      valueLabelDisplay="auto"
      aria-label="pretto slider"
      defaultValue={defaultValue}
    />
  )
}

export default CustomizedSlider
