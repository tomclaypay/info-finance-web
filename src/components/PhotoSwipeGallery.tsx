import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Slider from 'react-slick'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { Gallery, GalleryProps, Item } from 'react-photoswipe-gallery'
import { useMemo, useRef, useState } from 'react'
import { useImageSize } from 'react-image-size'
import resolvedStatus from '../../public/static/exchange-review/resolved-exchange-review.png'

interface IPhotoSwipeGallery {
  photos: string[]
  status?: string
}

function GalleryItem(props: { src: string; id: number }) {
  const [dimensions] = useImageSize(props?.src)
  return (
    <div>
      <Item
        cropped
        original={props?.src}
        thumbnail={props?.src}
        width={dimensions?.width}
        height={dimensions?.height}
        alt="Photo of seashore by Folkert Gorter"
        id={`pic_${props?.id}`}
      >
        {({ ref, open }) => (
          <Box ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open} position="relative">
            <Image
              loading="lazy"
              alt="gallery-item"
              src={props?.src}
              height={440}
              width={600}
              objectFit="contain"
              style={{ cursor: 'pointer' }}
            />
          </Box>
        )}
      </Item>
    </div>
  )
}

function PhotoSwipeGallery(props: IPhotoSwipeGallery) {
  const customSlider = useRef<Slider>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      swipeToSlide: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (current: number, next: number) => {
        setCurrentSlide(next)
      },
    }),
    []
  )

  const uiElements: GalleryProps['uiElements'] = [
    {
      name: 'custom-rotate-button',
      ariaLabel: 'Rotate',
      order: 9,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner:
          '<path d="M13.887 6.078C14.258 6.234 14.5 6.598 14.5 7V8.517C18.332 8.657 21.258 10.055 23.15 12.367 24.519 14.041 25.289 16.13 25.496 18.409A1 1 0 0123.504 18.591C23.327 16.645 22.68 14.952 21.601 13.633 20.156 11.867 17.831 10.653 14.5 10.517V12A1.002 1.002 0 0112.779 12.693L10.304 10.121A1.002 1.002 0 0110.324 8.713L12.8 6.286A1 1 0 0113.887 6.078ZM7.5 16A1.5 1.5 0 006 17.5V24.5A1.5 1.5 0 007.5 26H17.5A1.5 1.5 0 0019 24.5V17.5A1.5 1.5 0 0017.5 16H7.5Z" id="pswp__icn-rotate"/>',
        outlineID: 'pswp__icn-rotate',
      },
      appendTo: 'bar',
      onClick: (e, el, pswpInstance) => {
        if (!pswpInstance.currSlide?.content.element) {
          return
        }

        const item = pswpInstance.currSlide.content.element

        const prevRotateAngle = Number(item.dataset.rotateAngel) || 0
        const rotateAngle = prevRotateAngle === 270 ? 0 : prevRotateAngle + 90

        // add slide rotation
        item.style.transform = `${item.style.transform.replace(
          `rotate(-${prevRotateAngle}deg)`,
          ''
        )} rotate(-${rotateAngle}deg)`
        item.dataset.rotateAngel = String(rotateAngle)
      },
      onInit: (el, pswpInstance) => {
        // remove applied rotation on slide change
        // https://photoswipe.com/events/#slide-content-events
        pswpInstance.on('contentRemove', () => {
          if (!pswpInstance.currSlide?.content.element) {
            return
          }

          const item = pswpInstance.currSlide.content.element
          item.style.transform = `${item.style.transform.replace(`rotate(-${item.dataset.rotateAngel}deg)`, '')}`
          delete item.dataset.rotateAngel
        })
      },
    },
  ]
  return (
    <Stack>
      <Gallery uiElements={uiElements} options={{ wheelToZoom: true }} id="my-gallery">
        <Slider {...settings} ref={customSlider}>
          {props?.photos?.map((image: string, index: number) => (
            <Box key={index}>
              <Box
                sx={{
                  background: '#F4F8FF',
                  display: 'flex',
                  justifyContent: 'center',
                  pt: 3,
                  pb: 13,
                  height: 600,
                }}
              >
                <GalleryItem src={image} id={index} />
              </Box>
            </Box>
          ))}
        </Slider>
      </Gallery>
      {props?.status === 'resolved' && (
        <Stack
          sx={{
            position: 'absolute',
            bottom: 280,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Image src={resolvedStatus} loading="lazy" alt="Hình ảnh" width="200px" height="70px" objectFit="contain" />
        </Stack>
      )}
      {props?.photos?.length > 1 && (
        <>
          <Box
            sx={{
              position: 'absolute',
              bottom: 280,
              backgroundColor: 'white',
              padding: 1,
              display: 'flex',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              left: 48,
              cursor: 'pointer',
            }}
            onClick={() =>
              customSlider.current?.slickGoTo(currentSlide === 0 ? props?.photos?.length - 1 : currentSlide - 1)
            }
          >
            <ArrowBackIosRoundedIcon />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: 280,
              backgroundColor: 'white',
              padding: 1,
              display: 'flex',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              right: 48,
              cursor: 'pointer',
            }}
            onClick={() =>
              customSlider.current?.slickGoTo(currentSlide < props?.photos?.length - 1 ? currentSlide + 1 : 0)
            }
          >
            <ArrowForwardIosRoundedIcon />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: 24,
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              rowGap: 2,
            }}
          >
            <Typography>{`${currentSlide + 1}/${props?.photos?.length}`}</Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1} paddingX={2} justifyContent="center">
              {props?.photos?.map((image: string, index: number) => (
                <Box
                  key={image}
                  height={16}
                  width={16}
                  borderRadius={8}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: currentSlide === index ? '#2A559C' : '',
                    border: currentSlide !== index ? '1px #777 solid' : '',
                  }}
                  onClick={() => customSlider.current?.slickGoTo(index)}
                />
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  )
}

export default PhotoSwipeGallery
