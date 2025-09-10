import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './embla-thumb'
import { Box } from '@mui/material'
import Image from 'next/image'

interface EmblaCarouselProps {
  slides?: any[]
  internet?: boolean
  mobile?: boolean
}

const EmblaCarousel = ({ slides, internet = false, mobile }: EmblaCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!embla || !emblaThumbs) return
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index)
    },
    [embla, emblaThumbs]
  )

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return
    setSelectedIndex(embla.selectedScrollSnap())
    emblaThumbs.scrollTo(embla.selectedScrollSnap())
  }, [embla, emblaThumbs, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  return (
    <Box>
      {slides && (
        <>
          <div className="embla">
            <div className="embla__viewport" ref={mainViewportRef}>
              <div className="embla__container">
                {slides?.map((image, index) => (
                  <div className="embla__slide" key={index}>
                    <div
                      className="embla__slide__inner"
                      style={{
                        height: '70vh',
                      }}
                    >
                      <Box className="embla__slide__img" position="relative">
                        {image.typeFile === 'video' ? (
                          <video
                            controls
                            preload="none"
                            style={{
                              objectFit: 'cover',
                              objectPosition: 'center',
                              borderRadius: '8px',
                              backgroundColor: 'rgba(0,0,0,0.7)',
                              cursor: 'pointer',
                            }}
                          >
                            <source src={image.url} type="video/mp4" />
                          </video>
                        ) : (
                          <Image
                            src={internet ? image : image.url}
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                            alt="Hình ảnh chỉ mang chính chất minh hoạ"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                            loading="lazy"
                          />
                        )}
                      </Box>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!mobile && (
            <div className="embla embla--thumb">
              <div className="embla__viewport" ref={thumbViewportRef}>
                <div className="embla__container embla__container--thumb">
                  {slides?.map((image, index) => (
                    <Thumb
                      onClick={() => onThumbClick(index)}
                      selected={index === selectedIndex}
                      imgSrc={internet ? image : image.url}
                      fileType={image.typeFile}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Box>
  )
}

export default EmblaCarousel
