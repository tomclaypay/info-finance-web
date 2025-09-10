import { IconButton } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const PrevArrow = (props: any) => {
  const { onClick, currentSlide } = props
  return (
    <>
      {currentSlide !== 0 && (
        <IconButton
          onClick={onClick}
          sx={{
            justifyItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 0,
            zIndex: 10,
            backgroundColor: 'white',
            top: '45%',
            width: '44px',
            height: '44px',
            borderRadius: '100%',
            boxShadow: '4px 4px 16px 0px rgba(0, 0, 0, 0.24)',
          }}
        >
          <Image
            alt="Amplify"
            src="/static/home/SliderLeft.svg"
            width={24}
            height={24}
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        </IconButton>
      )}
    </>
  )
}

export default PrevArrow
