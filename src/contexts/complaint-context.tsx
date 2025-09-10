import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { CANCEL_REQUEST_STATUS } from '@app/constants/userComplaint'
import { UpdatingCancelRequest } from '@app/interfaces/cancel-request'
import { Complaint, ComplaintLog, UpdatingComplaintStatus, UploadingComplaintContract } from '@app/interfaces/complaint'
import { createContext, ReactNode, useMemo } from 'react'

interface ComplaintCommonTypes {
  complaint: Complaint
  updateComplaintLoading: boolean
  onUpdateComplaintStatus: (complaint: UpdatingComplaintStatus) => void
  onUploadContract: (contract: UploadingComplaintContract) => void
  onUpdateCancelRequest: (cancelRequest: UpdatingCancelRequest) => void
}

interface ComplaintContextTypes extends ComplaintCommonTypes {
  oldStatuses: ComplaintLog[]
  currentStatus?: COMPLAINT_STATUS
  previousStatus?: COMPLAINT_STATUS
  hasCancelRequest: boolean
}

interface ComplaintProviderProps extends ComplaintCommonTypes {
  children: ReactNode
}

export const ComplaintContext = createContext<ComplaintContextTypes>(null as any)

export default function ComplaintProvider(props: ComplaintProviderProps) {
  const {
    children,
    complaint,
    updateComplaintLoading,
    onUpdateComplaintStatus,
    onUploadContract,
    onUpdateCancelRequest,
  } = props
  const oldStatuses = useMemo(() => complaint?.logs.filter((log) => log.newStatus || log.oldStatus) || [], [complaint])
  const currentStatus = useMemo(() => oldStatuses[oldStatuses.length - 1]?.newStatus, [oldStatuses])
  const previousStatus = useMemo(() => oldStatuses[oldStatuses.length - 1]?.oldStatus, [oldStatuses])
  const hasCancelRequest = useMemo(
    () =>
      complaint.cancelRequests.length > 0 &&
      complaint.cancelRequests[complaint.cancelRequests.length - 1].status === CANCEL_REQUEST_STATUS.PENDING,
    [complaint]
  )

  return (
    <ComplaintContext.Provider
      value={{
        complaint,
        updateComplaintLoading,
        oldStatuses,
        currentStatus,
        previousStatus,
        hasCancelRequest,
        onUpdateComplaintStatus,
        onUploadContract,
        onUpdateCancelRequest,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  )
}
