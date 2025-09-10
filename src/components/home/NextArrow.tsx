import { IconButton } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const NextArrow = (props: any) => {
  const { onClick, currentSlide, slideCount, slidesToShow } = props
  return (
    <>
      {currentSlide !== slideCount - slidesToShow && (
        <IconButton
          onClick={onClick}
          sx={{
            justifyItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 0,
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
            loading="lazy"
            alt="Icon"
            src="/static/home/SliderRight.svg"
            width={24}
            height={24}
            style={{ objectFit: 'cover' }}
          />
        </IconButton>
      )}
    </>
  )
}

export default NextArrow
