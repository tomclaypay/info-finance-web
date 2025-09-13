import { useMutation } from '@apollo/client'
import { useAuth } from '@app/hooks/use-auth'
import { Plus as PlusIcon } from '@app/icons/plus'
import { Upload as UploadIcon } from '@app/icons/upload'
import CREATE_EXCHANGE from '@app/operations/mutations/exchanges/create-exchange'
import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import * as XLSX from 'xlsx'

interface ExchangesHeaderPRops {
  handleCreateExchange: () => void
}

const SheetJSFT = ['xlsx', 'xlsb', 'xlsm', 'xls', 'csv']
  .map(function (x) {
    return '.' + x
  })
  .join(',')

export default function ExchangesHeader({ handleCreateExchange }: ExchangesHeaderPRops) {
  const auth = useAuth()
  const [dataArr, setDataArr] = useState([])

  const [createExchange] = useMutation(CREATE_EXCHANGE)

  const handleUploadFile = (e: any) => {
    e.preventDefault()

    const files = e.target.files
    const f = files[0]
    const reader = new FileReader()
    reader.onload = function (e) {
      const data = e?.target?.result
      const readedData = XLSX.read(data, { type: 'binary' })
      const wsname = readedData.SheetNames[0]
      const ws = readedData.Sheets[wsname]

      /* Convert array to json*/
      const dataParse: any = XLSX.utils.sheet_to_json(ws, { header: 1 })?.filter((item: any) => item.length > 0)
      setDataArr(dataParse)
    }
    reader.readAsBinaryString(f)
  }

  useEffect(() => {
    if (dataArr.length > 0) {
      const [data1, ...other] = dataArr
      other?.map((item) => {
        createExchange({
          variables: {
            name: item[1],
            website: item[2],
          },
        })
      })
    }
  }, [dataArr])

  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="flex-end" spacing={3}>
          <Typography variant="h4">Sàn giao dịch</Typography>
          <Link component={NextLink} href="/dashboard/exchanges/general" passHref>
            <Typography color="primary.main" sx={{ fontWeight: 'bold' }}>
              Chi tiết chung
            </Typography>
          </Link>
        </Stack>

        {auth?.user?.role === 'super_admin' && (
          <>
            {/* <label htmlFor="button-upload-employees">
              <input
                accept={SheetJSFT}
                id="button-upload-employees"
                multiple
                type="file"
                onChange={handleUploadFile}
                style={{ display: 'none' }}
              />
              <Button
                sx={{ marginRight: 2 }}
                startIcon={<UploadIcon fontSize="small" />}
                variant="contained"
                component="span"
              >
                Upload File
              </Button>
            </label> */}
            <Button startIcon={<PlusIcon fontSize="small" />} variant="contained" onClick={handleCreateExchange}>
              Tạo sàn giao dịch
            </Button>
          </>
        )}
      </Stack>
    </Box>
  )
}
