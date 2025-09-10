export enum EVENT_STATUS {
  COMING = 'coming',
  DOING = 'doing',
  END = 'end',
}

export const COMPLAINT_STATUS_COLOR = {
  [EVENT_STATUS.COMING]: '#0f71e5',
  [EVENT_STATUS.DOING]: '#0f71e5',
  [EVENT_STATUS.END]: '#e71414',
}

export const COMPLAINT_STATUS_LABEL = {
  [EVENT_STATUS.COMING]: 'Sắp diễn ra',
  [EVENT_STATUS.DOING]: 'Đang diễn ra',
  [EVENT_STATUS.END]: 'Đã kết thúc',
}
