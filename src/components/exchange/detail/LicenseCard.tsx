import { useMobile } from '@app/components/common'
import InputField from '@app/components/dashboard/common/form-fields/input-field'
import { License } from '@app/interfaces/license'
import { Supervisor } from '@app/interfaces/supervisor'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  Link,
  Modal,
  Stack,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { SearchHeaderIcon } from '@app/icons'

interface LicenseCardProps {
  license: License
  dataSupervisories?: Supervisor[]
  onNameSupervisorChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    color: 'black',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.12)',
  },
})
const LicenseCard = ({ license, dataSupervisories, onNameSupervisorChange }: LicenseCardProps) => {
  const [popupSupervisor, setPopupSupervisor] = useState<{ open: boolean; content: Partial<Supervisor> }>({
    open: false,
    content: license.supervisory_authority,
  })
  const isMobile = useMobile()

  const { t } = useTranslation(['exchange', 'common'])
  const { locale } = useRouter()

  const [popupLicense, setPopupLicense] = useState(false)
  const [popupOfficeMobile, setPopupOfficeMobile] = useState(false)
  return (
    <Stack spacing={1} key={license.id} direction={isMobile ? 'column' : 'row'}>
      <Stack
        flex={4}
        direction={isMobile ? 'column' : 'row'}
        p={2}
        spacing={1}
        sx={{
          backgroundColor: '#F4F8FF',
          borderRadius: 1.5,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: '120px',
            }}
          >
            <Box
              sx={{
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                '& > span': {
                  position: 'absolute!important',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
              }}
            >
              <Image
                src={
                  license.supervisory_authority.national?.logo ||
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z'
                }
                alt="icon"
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                loading="lazy"
              />
            </Box>
          </Box>
          {isMobile && (
            <Typography fontWeight="bold" variant="body2">
              {locale === 'vi' ? license.license_type_vn : license.license_type_en}
            </Typography>
          )}
        </Stack>

        <Stack px={isMobile ? 0 : 1} justifyContent="space-between" py={0.2}>
          {!isMobile && (
            <Typography fontWeight="bold" variant="body2">
              {locale === 'vi' ? license.license_type_vn : license.license_type_en}
            </Typography>
          )}
          <Stack direction="row" spacing={1} alignItems="center">
            <Stack
              py={0.7}
              px={2}
              sx={{
                backgroundColor: 'primary.main',
                color: '#ffffff',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {license.supervisory_authority.abbreviation_name}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ fontSize: '16px' }}>
              {locale === 'en' && license.status_en !== '' && license.status_en !== null
                ? license.status_en
                : license.status}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        spacing={1}
        sx={{
          color: 'primary.main',
          fontWeight: '500',
        }}
        justifyContent="space-between"
      >
        <Stack
          sx={{
            backgroundColor: '#F4F8FF',
            borderRadius: 1,
            flex: '1',
            cursor: 'pointer',
          }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          px={2}
          onClick={() => setPopupLicense(true)}
        >
          <DescriptionOutlinedIcon />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              py: 1.5,
            }}
          >
            {t('detail.license')}
          </Typography>
        </Stack>

        <Stack
          sx={{
            backgroundColor: '#F4F8FF',
            borderRadius: 1,
            flex: '1',
            cursor: 'pointer',
          }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          px={2}
          onClick={() => setPopupSupervisor({ open: true, content: license.supervisory_authority })}
        >
          <ManageAccountsOutlinedIcon />
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              py: 1.5,
            }}
          >
            {t('detail.supervisor')}
          </Typography>
        </Stack>
      </Stack>

      {/* Popup supervisor */}
      <Dialog
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '720px',
            },
          },
        }}
        open={popupSupervisor.open}
        onClose={() => setPopupSupervisor({ ...popupSupervisor, open: false })}
      >
        <DialogTitle
          sx={{
            p: 0,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography pl={2} fontWeight="bold" fontSize={32}>
              {t('detail.supervisor')}
            </Typography>
            <Stack
              p={2}
              sx={{
                cursor: 'pointer',
              }}
            >
              <CloseRoundedIcon onClick={() => setPopupSupervisor({ ...popupSupervisor, open: false })} />
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ width: '100%' }}>
          <Stack spacing={1} pt={1}>
            <Box
              sx={{
                borderRadius: '8px',
                boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.12)',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                '& > span': {
                  position: 'absolute!important',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
              }}
            >
              <Image
                src={popupSupervisor.content.logo}
                alt="icon"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                width={400}
                height={226}
                loading="lazy"
              />
            </Box>
            <Typography
              // variant="h4"
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: '20px',
                lineHeight: '26px',
              }}
            >
              {popupSupervisor.content.name}
            </Typography>

            <Typography
              dangerouslySetInnerHTML={{
                __html:
                  locale === 'en' && popupSupervisor.content.intro_en !== ''
                    ? (popupSupervisor.content.intro_en as string)
                    : (popupSupervisor.content.intro_vn as string),
              }}
              sx={{
                color: '#000000',
                textAlign: 'justify',
                '& > p': {
                  margin: '0',
                },
                WebkitBoxOrient: 'vertical',
              }}
              variant="body2"
            />

            <Stack
              p={1}
              sx={{
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: '8px',
              }}
            >
              <Stack sx={{ backgroundColor: '#ffffff', borderRadius: '50px' }}>
                <InputField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchHeaderIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder={t('search')}
                  fullWidth
                  // label={t('search')}
                  onChange={onNameSupervisorChange}
                  sx={{
                    '& fieldset': {
                      borderRadius: '50px',
                    },
                  }}
                />
              </Stack>
              <Grid container spacing={1} mt={1}>
                {dataSupervisories?.map((supervisor) => (
                  <Grid
                    item
                    xs={4}
                    md={12 / 5}
                    key={supervisor.id}
                    sx={{
                      cursor: 'pointer',
                    }}
                    onClick={() => setPopupSupervisor({ open: true, content: supervisor })}
                  >
                    <Stack
                      px={2}
                      py={1}
                      sx={{
                        backgroundColor: supervisor.id === popupSupervisor.content.id ? 'primary.main' : 'transparent',
                        border: '1px solid #2A559C',
                        borderRadius: 1.2,
                        height: '100%',
                      }}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography
                        variant="overline"
                        textTransform="uppercase"
                        textAlign="center"
                        fontSize="14px"
                        lineHeight={20}
                        sx={{
                          color: supervisor.id === popupSupervisor.content.id ? '#ffffff' : 'primary.main',
                        }}
                      >
                        {supervisor.abbreviation_name}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Popup license */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={popupLicense}
        onClose={() => setPopupLicense(false)}
        closeAfterTransition
      >
        <Box
          sx={{
            backgroundImage: `url('https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/telegram_cloud_photo_size_4_5864884731995336364_y_1_e1232c188c.png?updated_at=2023-01-10T06:21:04.079Z')`,
            width: '857px',
            height: '698px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: isMobile ? 'translate(-50%, -50%) scale(0.4)' : 'translate(-50%, -50%)',
          }}
          p={2}
        >
          <CloseRoundedIcon
            sx={{ position: 'absolute', right: 32, top: 32, zIndex: 5, cursor: 'pointer' }}
            onClick={() => setPopupLicense(false)}
          />
          <Box
            sx={{
              position: 'relative',
              height: '100%',
            }}
          >
            <Box
              sx={{
                width: '332px',
                height: '166px',
                position: 'absolute',
                bottom: '-14px',
                right: '0',
              }}
            >
              <Image
                layout="fill"
                src={
                  locale === 'en'
                    ? '/static/exchange-review/logoLicenseEn.png'
                    : 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Stamp_1_f7f3aa9d91.png?updated_at=2023-01-10T06:52:34.198Z'
                }
                objectFit="cover"
                style={locale === 'en' ? { transform: 'rotate(-15.3deg)' } : {}}
                alt="logo"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                loading="lazy"
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: '95px',
                left: '160px',
                zIndex: 2,
              }}
            >
              <Image
                src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/image_19_77f22c2aff.png?updated_at=2023-01-11T01:51:21.687Z"
                alt="icon-flag"
                width="145px"
                height="145px"
                loading="lazy"
              />
            </Box>
            <Typography
              sx={{
                width: '100px',
                color: '#BD162F',
                fontWeight: 'bold',
                fontSize: '14px',
                transform: 'rotate(-29deg)',
                position: 'absolute',
                top: '152px',
                left: '180px',
                lineHeight: '15px',
                textAlign: 'center',
                zIndex: 2,
              }}
            >
              {locale === 'en' && license?.status_en !== '' && license?.status_en !== null
                ? license.status_en
                : license.status}
            </Typography>
            <Grid container p={2} spacing={2}>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Stack sx={{ border: '1px solid #E5D7BE' }}>
                    <Image
                      loading="lazy"
                      src={license.supervisory_authority.logo}
                      alt="icon"
                      width="216px"
                      height="120px"
                    />
                  </Stack>
                  <Stack
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                      }}
                    >
                      {license.supervisory_authority.name}
                    </Typography>

                    {isMobile ? (
                      <Button
                        onClick={() => setPopupOfficeMobile(true)}
                        sx={{
                          fontSize: '14px',
                          backgroundColor: '#F4F8FF',
                        }}
                      >
                        {t('license.introOffice')}
                      </Button>
                    ) : (
                      <CustomWidthTooltip
                        title={
                          <Typography
                            dangerouslySetInnerHTML={{
                              __html:
                                locale === 'en' && license?.supervisory_authority.intro_en !== ''
                                  ? (license?.supervisory_authority.intro_en as string)
                                  : (license?.supervisory_authority.intro_vn as string),
                            }}
                          />
                        }
                      >
                        <Button
                          sx={{
                            fontSize: '14px',
                            backgroundColor: '#F4F8FF',
                          }}
                        >
                          {t('license.introOffice')}
                        </Button>
                      </CustomWidthTooltip>
                    )}
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <Typography variant="body2">{t('license.status')}</Typography>
                  <Stack
                    sx={{
                      px: 1.5,
                      py: 1,
                      backgroundColor: '#0EE195',
                      width: 'max-content',
                      color: '#ffffff',
                      borderRadius: '8px',
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {locale === 'en' && license.status_en !== '' && license?.status_en !== null
                        ? license.status_en
                        : license.status}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <Typography variant="body2">{t('license.type')}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {locale === 'en' && license.license_type_en !== ''
                      ? license.license_type_en
                      : license.license_type_vn}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <Typography variant="body2">{t('license.country')}</Typography>
                  <Stack direction="row" spacing={2}>
                    {license.supervisory_authority.national?.logo && (
                      <Image
                        src={license.supervisory_authority.national?.logo}
                        alt="flag-contry"
                        width={32}
                        height={24}
                        loading="lazy"
                      />
                    )}
                    <Typography variant="body2" fontWeight="bold">
                      {locale === 'en'
                        ? license.supervisory_authority.national?.name
                        : license.supervisory_authority.national?.name_vn}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <Typography variant="body2">{t('license.numOfLicense')}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {license.supervision_license}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Divider
                  color="#E5D7BE"
                  sx={{
                    borderColor: '#E5D7BE',
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <Typography variant="body2">{t('license.owner')}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {license.regulatory_license_agency}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <Typography variant="body2">{t('license.effectiveTime')}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {license.effective_date !== null
                      ? format(new Date(license.effective_date), 'dd/MM/yyyy')
                      : 'Invalid Date'}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <Typography variant="body2">{t('license.email')}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {license.authority_email}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <Typography variant="body2">{t('license.expirationTime')}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {license.expiration_date !== null
                      ? format(new Date(license.expiration_date), 'dd/MM/yyyy')
                      : 'Invalid Date'}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <Typography variant="body2">{t('license.website')}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {license.authority_website}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <Typography variant="body2">{t('license.phone')}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {license.authority_phone}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack>
                  <Typography variant="body2">{t('license.address')}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {license.authority_address}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack>
                  <Typography variant="body2">{t('license.evidence')}</Typography>
                  {license.documentary_evidences.map((document) => (
                    <Stack direction="row" key={document.id} spacing={2}>
                      <Typography variant="body2" fontWeight="bold" textTransform="uppercase">
                        {document.title}
                      </Typography>
                      <Link component={NextLink} href={document.file} passHref target="_blank">
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{
                            color: 'primary.main',
                            cursor: 'pointer',
                          }}
                        >
                          {t('license.check')}
                        </Typography>
                      </Link>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
      <Dialog maxWidth="sm" open={popupOfficeMobile} onClose={() => setPopupOfficeMobile(false)}>
        <DialogContent>
          <Stack>
            <Typography
              dangerouslySetInnerHTML={{
                __html:
                  locale === 'en' && license?.supervisory_authority.intro_en !== ''
                    ? (license?.supervisory_authority.intro_en as string)
                    : (license?.supervisory_authority.intro_vn as string),
              }}
              sx={{
                textAlign: 'justify',
              }}
            />
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  )
}

export default LicenseCard
