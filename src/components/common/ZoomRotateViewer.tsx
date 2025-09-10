import { Box } from '@mui/system'
import React, { useRef } from 'react'
import ReactPanZoom from 'react-image-pan-zoom-rotate'

export interface ZoomRotateViewer {
  image: string
  handleCloseZoomRotateViewer: () => void
}
export default function ZoomRotateViewer({ image, handleCloseZoomRotateViewer }: ZoomRotateViewer) {
  const modalRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleCloseZoomRotateViewer()
    }
  }

  return (
    <Box
      sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, bgcolor: '#f4f8ffd6' }}
      onClick={handleClickOutside}
    >
      <Box ref={modalRef} sx={{ position: 'fixed', top: '20%', left: '20%', right: '20%', bottom: '10%' }}>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            overflowY: 'hidden',
            zIndex: 9999999,
          }}
        >
          <ReactPanZoom alt="cool image" image={image} />
        </Box>
      </Box>
    </Box>
  )
}
