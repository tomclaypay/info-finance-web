import { COMPLAINT_STATUS, COMPLAINT_STATUS_COLOR, COMPLAINT_STATUS_LABEL } from '@app/constants/complaint'
import { Box, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import PropTypes from 'prop-types'

export const PropertyListItem = (props: any) => {
  const { align, children, disableGutters, value, label, parse = false, style = false, cancel } = props

  return (
    <ListItem
      sx={{
        px: disableGutters ? 0 : 3,
        py: 1.5,
      }}
      divider
    >
      <ListItemText
        disableTypography
        primary={
          <Typography sx={{ minWidth: align === 'vertical' ? 'inherit' : 180 }} variant="subtitle2">
            {label}
          </Typography>
        }
        secondary={
          <Box
            sx={{
              flex: 1,
              mt: align === 'vertical' ? 0.5 : 0,
            }}
          >
            {/* {children || (
              <Typography color="textSecondary" variant="body2">
                {value}
              </Typography>
            )} */}
            {parse ? (
              <Typography
                dangerouslySetInnerHTML={{
                  __html: value,
                }}
                color="textSecondary"
                variant="body2"
              />
            ) : style ? (
              <Typography color="textSecondary" variant="body2" width="max-content">
                <Stack
                  alignItems="center"
                  sx={{
                    py: 0.5,
                    borderRadius: '10px',
                    bgcolor:
                      cancel?.status === 'pending' ? '#FFCD1A' : COMPLAINT_STATUS_COLOR[value as COMPLAINT_STATUS],
                    color: cancel?.status === 'pending' ? 'black' : 'white',
                    fontWeight: 600,
                    textAlign: 'center',
                    px: 5,
                  }}
                >
                  {cancel?.status === 'pending' ? 'Yêu cầu huỷ' : COMPLAINT_STATUS_LABEL[value as COMPLAINT_STATUS]}
                </Stack>
              </Typography>
            ) : (
              children || (
                <>
                  {Array.isArray(value) ? (
                    value.map((item) => (
                      <Link href={item?.url} key={item?.url} passHref>
                        {item?.url}
                      </Link>
                    ))
                  ) : (
                    <Typography color="textSecondary" variant="body2">
                      {value}
                    </Typography>
                  )}
                </>
              )
            )}
          </Box>
        }
        sx={{
          display: 'flex',
          flexDirection: align === 'vertical' ? 'column' : 'row',
          my: 0,
          alignItems: 'center',
        }}
      />
    </ListItem>
  )
}

PropertyListItem.defaultProps = {
  align: 'vertical',
}

PropertyListItem.propTypes = {
  align: PropTypes.oneOf(['horizontal', 'vertical']),
  children: PropTypes.node,
  disableGutters: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  parse: PropTypes.bool,
  style: PropTypes.bool,
  cancel: PropTypes.object,
}
