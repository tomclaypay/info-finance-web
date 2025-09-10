import { Button } from '@mui/material'
import React from 'react'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'

export const DotButtonReview = ({ selected, onClick }) => (
  <Button
    sx={{
      cursor: 'pointer',
      position: 'relative',
      border: !selected ? '1px solid #777777 ' : '1px solid transparent ',
      padding: '0',
      width: '16px',
      minWidth: '16px',
      height: '16px',
      marginRight: '7.5px',
      marginLeft: '7.5px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: !selected ? 'transparent' : '#2A559C',
    }}
    type="button"
    onClick={onClick}
  />
)

export const PrevButtonReview = ({ enabled, onClick }) => (
  <Button
    sx={{
      height: '40px',
      width: '40px',
      borderRadius: '20px',
      backgroundColor: '#ffffff',
      left: '10%',
      top: '50%',
      position: 'absolute',
      transform: 'translateY(-50%)',
      minWidth: '0',
      fontSize: 'small',

      '&:disabled': {
        cursor: 'default',
        opacity: '0.3',
      },
    }}
    onClick={onClick}
    disabled={!enabled}
  >
    <ArrowBackIosNewRoundedIcon sx={{ color: 'text.main' }} />
  </Button>
)

export const NextButtonReview = ({ enabled, onClick }) => (
  <Button
    sx={{
      height: '40px',
      width: '40px',
      borderRadius: '20px',
      backgroundColor: '#ffffff',
      right: '10%',
      top: '50%',
      position: 'absolute',
      transform: 'translateY(-50%)',
      minWidth: '0',
      fontSize: 'small',

      '&:disabled': {
        cursor: 'default',
        opacity: '0.3',
      },
    }}
    onClick={onClick}
    disabled={!enabled}
  >
    <ArrowForwardIosRoundedIcon sx={{ color: 'text.main' }} />
  </Button>
)
