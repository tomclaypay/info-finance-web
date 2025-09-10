import { Stack } from '@mui/material'
import CustomImage from './custom-image'

interface ThumbnailsProps {
  thumbnailUrls?: any[]
  onRemove: (thumbnail: number) => void
  disabled?: boolean
}

export default function Thumbnails({ thumbnailUrls, onRemove, disabled }: ThumbnailsProps) {
  const local = !!thumbnailUrls?.find((thumbnail) => thumbnail?.type)
  return (
    <>
      {thumbnailUrls && local && (
        <Stack direction="row" gap={1} mt={1} flexWrap="wrap">
          {thumbnailUrls?.map((thumbnail, index) => {
            return (
              <CustomImage
                key={index}
                disabled={disabled}
                image={
                  thumbnail?.type?.includes('image')
                    ? thumbnail?.url
                    : 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/35920_c9367f9c00.png?updated_at=2022-10-07T07:59:55.903Z'
                }
                index={index}
                slides={
                  thumbnail?.type?.includes('image')
                    ? thumbnailUrls
                    : [
                        {
                          type: 'doc',
                          url: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/35920_c9367f9c00.png?updated_at=2022-10-07T07:59:55.903Z',
                        },
                      ]
                }
                onRemove={onRemove}
              />
            )
          })}
        </Stack>
      )}
      {thumbnailUrls && !local && (
        <Stack direction="row" gap={1} mt={1} flexWrap="wrap">
          {thumbnailUrls?.map((thumbnail, index) => {
            return (
              <CustomImage
                key={index}
                disabled={disabled}
                internet={true}
                image={
                  thumbnail?.includes('image')
                    ? thumbnail
                    : 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/35920_c9367f9c00.png?updated_at=2022-10-07T07:59:55.903Z'
                }
                index={index}
                slides={
                  thumbnail?.includes('image')
                    ? thumbnailUrls
                    : [
                        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/35920_c9367f9c00.png?updated_at=2022-10-07T07:59:55.903Z',
                      ]
                }
                onRemove={onRemove}
              />
            )
          })}
        </Stack>
      )}
    </>
  )
}
