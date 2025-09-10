import { useMutation, useQuery } from '@apollo/client'
import BackButtonInitial from '@app/components/dashboard/common/back-button-initial'
import ComplaintContractSection from '@app/components/dashboard/complaints/complaint-details/complaint-contract-section'
import ComplaintDetailsHeader from '@app/components/dashboard/complaints/complaint-details/complaint-details-header'
import { ComplaintDetailsSection } from '@app/components/dashboard/complaints/complaint-details/complaint-details-section'
import { ComplaintHandleLog } from '@app/components/dashboard/complaints/complaint-details/complaint-handle-section/complaint-handle-log'
import ComplaintImagesSection from '@app/components/dashboard/complaints/complaint-details/complaint-images-section'
import { ComplaintLogsSection } from '@app/components/dashboard/complaints/complaint-details/complaint-logs-section'
import ComplaintDetailsTabs from '@app/components/dashboard/complaints/complaint-details/complaint-tabs'
import { OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import ComplaintProvider from '@app/contexts/complaint-context'
import UploadFileProvider from '@app/contexts/upload-file-context'

import useUploadFile from '@app/hooks/use-upload-file'
import { UpdatingCancelRequest } from '@app/interfaces/cancel-request'
import {
  ComplaintListResponse,
  ComplaintLog,
  UpdatingComplaintStatus,
  UploadingComplaintContract,
} from '@app/interfaces/complaint'
import ADD_COMPLAINT_CONTRACT from '@app/operations/mutations/complaints/add-complaint-contract'
import ADD_COMPLAINT_LOG from '@app/operations/mutations/complaints/add-complaint-log'
import UPDATE_CANCEL_REQUEST from '@app/operations/mutations/complaints/update-cancel-request'
import UPDATE_COMPLAINT from '@app/operations/mutations/complaints/update-complaint'
import GET_COMPLAINT_DETAILS from '@app/operations/queries/complaints/get-complaint-details'
import { Box, Container, Divider, Grid, Stack } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, SyntheticEvent, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthGuard } from '../../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout'

export interface CreateLogRefTypes {
  handleClose: () => void
}

const ComplaintDetails = () => {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState('details')
  const createLogRef = useRef<CreateLogRefTypes>(null)
  // const uploadFileRef = useRef<UploadFileRef>(null)
  const { complaintId, page, limit } = router.query

  const { data, refetch: refetchComplaint } = useQuery<ComplaintListResponse>(GET_COMPLAINT_DETAILS, {
    variables: {
      id: complaintId,
    },
    skip: !complaintId,
  })
  const [addComplaintLog, { loading: addComplaintLogLoading }] = useMutation(ADD_COMPLAINT_LOG)
  const [addComplaintContract] = useMutation(ADD_COMPLAINT_CONTRACT)
  const [updateCancelRequest] = useMutation(UPDATE_CANCEL_REQUEST)
  const [updateComplaintStatus, { loading: updateComplaintLoading }] =
    useMutation<UpdatingComplaintStatus>(UPDATE_COMPLAINT)

  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.COMPLAINT, type: UPLOAD_TYPE.IMAGE })

  const handleAddComplaintLog = async (log: Partial<ComplaintLog>) => {
    try {
      // const attachments = await uploadFileRef.current?.handleUploadFiles()
      const attachments = await handleUploadFiles(log.attachments as unknown as File[])
      await addComplaintLog({
        variables: {
          ...log,
          attachments,
        },
      })
      await refetchComplaint()
      setCurrentTab('logs')
      toast.success('Tạo log khiếu nại thành công!')
      createLogRef.current?.handleClose()
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const handleUpdateComplaintStatus = async (complaint: UpdatingComplaintStatus) => {
    try {
      await updateComplaintStatus({
        variables: {
          ...complaint,
        },
        onCompleted: () => {
          refetchComplaint()
          toast.success('Cập nhật khiếu nại thành công!')
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleUploadContract = async (contract: UploadingComplaintContract) => {
    try {
      await addComplaintContract({
        variables: {
          ...contract,
        },
        onCompleted: () => {
          refetchComplaint()
          toast.success('Tải lên hợp đồng thành công!')
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleUpdateCancelRequest = async (cancelRequest: UpdatingCancelRequest) => {
    try {
      await updateCancelRequest({
        variables: {
          cancelRequestId: cancelRequest.id,
          status: cancelRequest.status,
        },
        onCompleted: () => {
          refetchComplaint()
          toast.success('Xử lý yêu cầu thành công!')
        },
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleTabsChange = (event: SyntheticEvent<Element, Event>, value: string) => {
    setCurrentTab(value)
  }

  const complaint = data?.complaints[0]

  return (
    <>
      <Head>
        <title>Dashboard: Chi tiết khiếu nại | Infofx</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box>
            {/* <BackButton title="Danh sách khiếu nại" link="dashboard/complaints" /> */}
            <BackButtonInitial
              title="Danh sách khiếu nại"
              link="dashboard/complaints"
              page={page as string}
              limit={limit as string}
            />
            {/* <UploadFileProvider
              type={UPLOAD_TYPE.DOCUMENT}
              objectId={complaint?.id}
              objectType={OBJECT_TYPE.COMPLAINT_LOGS}
              ref={uploadFileRef}
            > */}
            <ComplaintDetailsHeader
              ref={createLogRef}
              complaint={complaint}
              onAddComplaintLog={handleAddComplaintLog}
              addComplaintLogLoading={addComplaintLogLoading}
            />
            {/* </UploadFileProvider> */}
            <ComplaintDetailsTabs currentTab={currentTab} handleTabsChange={handleTabsChange} />
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'details' && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {complaint && (
                    <Stack spacing={4}>
                      <ComplaintProvider
                        complaint={complaint}
                        updateComplaintLoading={updateComplaintLoading}
                        onUpdateComplaintStatus={handleUpdateComplaintStatus}
                        onUploadContract={handleUploadContract}
                        onUpdateCancelRequest={handleUpdateCancelRequest}
                      >
                        <UploadFileProvider
                          objectId={complaint.id}
                          type={UPLOAD_TYPE.DOCUMENT}
                          objectType={OBJECT_TYPE.COMPLAINT}
                        >
                          <ComplaintDetailsSection complaint={complaint} />
                        </UploadFileProvider>
                      </ComplaintProvider>

                      {/* <ComplaintHandleSection complaint={complaint} /> */}
                      <ComplaintImagesSection complaint={complaint} />
                      <ComplaintContractSection complaint={complaint} />
                    </Stack>
                  )}
                </Grid>
              </Grid>
            )}
            {currentTab === 'logs' && <ComplaintLogsSection logs={complaint?.log} status={complaint?.status} />}
            {currentTab === 'handle' && <ComplaintHandleLog handledBy={complaint?.handle_by} />}
          </Box>
        </Container>
      </Box>
    </>
  )
}

ComplaintDetails.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ComplaintDetails
