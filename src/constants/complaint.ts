export enum COMPLAINT_UPDATE_ACTION {
  accept = 'accept',
  decline = 'decline',
  approve = 'approve',
  reject = 'reject',
  contract_requested = 'contract_requested',
  resolve = 'resolve',
  close = 'close',
}

export const COMPLAINT_UPDATE_ACTION_LABEL = {
  accept: 'Nhận',
  decline: 'Không nhận',
  approve: 'Duyệt',
  reject: 'Không duyệt',
  contract_requested: 'Cần làm hợp đồng',
  resolve: 'Hoàn thành',
  close: 'Đóng hồ sơ',
}

export enum COMPLAINT_STATUS {
  PENDING = 'pending', // Đã gửi
  ACCEPTED = 'accepted', // Đã nhận
  DECLINED = 'declined', // Không nhận
  APPROVED = 'approved', // Đã duyệt
  REJECTED = 'rejected', // Không duyệt
  CONTRACT_REQUESTED = 'contract_requested', // Cần làm hợp đồng
  IN_PROGRESS = 'in_progress', // Đang xử lý
  CLOSED = 'closed', // Đóng hồ sơ
  RESOLVED = 'resolved', // Đã hoàn thành
}

export const RESULT_STATUS_AFTER_ACTION = {
  accept: COMPLAINT_STATUS.ACCEPTED,
  decline: COMPLAINT_STATUS.DECLINED,
  approve: COMPLAINT_STATUS.APPROVED,
  reject: COMPLAINT_STATUS.REJECTED,
  contract_requested: COMPLAINT_STATUS.CONTRACT_REQUESTED,
  resolve: COMPLAINT_STATUS.RESOLVED,
  close: COMPLAINT_STATUS.CLOSED,
}

export const COMPLAINT_STATUS_ACTIONS = {
  [COMPLAINT_STATUS.PENDING]: [COMPLAINT_UPDATE_ACTION.accept, COMPLAINT_UPDATE_ACTION.decline],
  [COMPLAINT_STATUS.ACCEPTED]: [COMPLAINT_UPDATE_ACTION.approve, COMPLAINT_UPDATE_ACTION.reject],
  [COMPLAINT_STATUS.APPROVED]: [COMPLAINT_UPDATE_ACTION.contract_requested, COMPLAINT_UPDATE_ACTION.close],
  [COMPLAINT_STATUS.IN_PROGRESS]: [COMPLAINT_UPDATE_ACTION.resolve, COMPLAINT_UPDATE_ACTION.close],
  [COMPLAINT_STATUS.DECLINED]: null,
  [COMPLAINT_STATUS.REJECTED]: null,
  [COMPLAINT_STATUS.CONTRACT_REQUESTED]: null,
  [COMPLAINT_STATUS.RESOLVED]: null,
  [COMPLAINT_STATUS.CLOSED]: null,
}

export const COMPLAINT_STATUS_COLOR = {
  [COMPLAINT_STATUS.PENDING]: '#0f71e5',
  [COMPLAINT_STATUS.ACCEPTED]: '#0f71e5',
  [COMPLAINT_STATUS.DECLINED]: '#e71414',
  [COMPLAINT_STATUS.APPROVED]: '#008a0e',
  [COMPLAINT_STATUS.REJECTED]: '#e71414',
  [COMPLAINT_STATUS.CONTRACT_REQUESTED]: '#d916a8',
  [COMPLAINT_STATUS.IN_PROGRESS]: '#0f71e5',
  [COMPLAINT_STATUS.RESOLVED]: '#008573',
  [COMPLAINT_STATUS.CLOSED]: '#e71414',
}

export const COMPLAINT_STATUS_LABEL = {
  [COMPLAINT_STATUS.PENDING]: 'Đã gửi',
  [COMPLAINT_STATUS.ACCEPTED]: 'Đã nhận',
  [COMPLAINT_STATUS.DECLINED]: 'Không nhận',
  [COMPLAINT_STATUS.APPROVED]: 'Đã duyệt',
  [COMPLAINT_STATUS.REJECTED]: 'Không duyệt',
  [COMPLAINT_STATUS.CONTRACT_REQUESTED]: 'Cần làm hợp đồng',
  [COMPLAINT_STATUS.IN_PROGRESS]: 'Đang xử lý',
  [COMPLAINT_STATUS.RESOLVED]: 'Đã hoàn thành',
  [COMPLAINT_STATUS.CLOSED]: 'Đóng hồ sơ',
}

export const COMPLAINT_STATUS_LIST = (Object.keys(COMPLAINT_STATUS) as Array<keyof typeof COMPLAINT_STATUS>).map(
  (status) => ({
    label: COMPLAINT_STATUS_LABEL[status.toLowerCase() as COMPLAINT_STATUS],
    value: COMPLAINT_STATUS[status],
  })
)
