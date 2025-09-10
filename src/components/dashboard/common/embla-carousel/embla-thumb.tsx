import React from 'react'

export const Thumb = ({ selected, onClick, imgSrc, fileType }: any) => (
  <div className={`embla__slide embla__slide--thumb ${selected ? 'is-selected' : ''}`}>
    <button onClick={onClick} className="embla__slide__inner embla__slide__inner--thumb" type="button">
      {fileType === 'image' ? (
        <img className="embla__slide__thumbnail" src={imgSrc} alt="A cool cat." />
      ) : (
        <video
          className="embla__slide__thumbnail"
          controlsList=""
          preload="none"
          style={{
            objectFit: 'cover',
            width: '100%',
            objectPosition: 'center',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          <source src={imgSrc} type="video/mp4" />
        </video>
      )}
    </button>
  </div>
)
