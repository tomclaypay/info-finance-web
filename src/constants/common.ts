export enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

export const SortOptions = [
  { value: Sort.ASC, label: 'Cũ nhất', label_en: 'Oldest' },
  { value: Sort.DESC, label: 'Mới nhất', label_en: 'Newest' },
]

export enum FormActions {
  CREATE = 'create',
  UPDATE = 'update',
}

export const FormActionLabels = {
  create: 'Tạo',
  update: 'Cập nhập',
}

export enum UPLOAD_TYPE {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
}

export enum OBJECT_TYPE {
  AVATAR = 'avatar',
  COVER = 'cover',
  COMPLAINT = 'complaint',
  COMPLAINT_LOGS = 'complaint_logs',
  CONTRACT = 'contract',
  EXCHANGE = 'exchange',
  KYC = 'kyc',
  EVENT = 'event',
  BANNER = 'banner',
}

export enum CANCEL_REQUEST_STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export const URL_LOCALE: any = {
  vi: {
    'tin-tuc': 'tin-tuc',
    'danh-gia-san': 'danh-gia-san',
    'su-kien': 'su-kien',
    'gioi-thieu': 'gioi-thieu',
    'tra-cuu-san': 'tra-cuu-san',
    'hoi-dap': 'hoi-dap',
    'chinh-sach-bao-mat': 'chinh-sach-bao-mat',
    'dieu-khoan-dieu-kien': 'dieu-khoan-dieu-kien',
    news: 'tin-tuc',
    'exchange-review': 'danh-gia-san',
    events: 'su-kien',
    about: 'gioi-thieu',
    broker: 'tra-cuu-san',
    faq: 'hoi-dap',
    'privacy-policy': 'chinh-sach-bao-mat',
    'terms-and-conditions': 'die-khoan-dieu-kien',
    scam: 'lua-dao',
    'investor-feedback-and-comments-mailbox': 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu',
    'general-review': 'danh-gia-tong-quat',
    'other-problems': 'ly-do-khac',
    'lua-dao': 'lua-dao',
    'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu': 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu',
    'danh-gia-tong-quat': 'danh-gia-tong-quat',
    'ly-do-khac': 'ly-do-khac',
    'danh-gia-cua-ban': 'danh-gia-cua-ban',
    'gui-danh-gia': 'gui-danh-gia',
    'create-review': 'gui-danh-gia',
    'your-review': 'danh-gia-cua-ban',
  },
  en: {
    news: 'news',
    'exchange-review': 'exchange-review',
    events: 'event',
    about: 'about',
    broker: 'broker',
    faq: 'faq',
    'terms-and-conditions': 'terms-and-conditions',
    'privacy-policy': 'privacy-policy',
    'dieu-khoan-dieu-kien': 'terms-and-conditions',
    'chinh-sach-bao-mat': 'privacy-policy',
    'tin-tuc': 'news',
    'danh-gia-san': 'exchange-review',
    'su-kien': 'events',
    'gioi-thieu': 'about',
    'tra-cuu-san': 'broker',
    'hoi-dap': 'faq',
    scam: 'scam',
    'investor-feedback-and-comments-mailbox': 'investor-feedback-and-comments-mailbox',
    'general-review': 'general-review',
    'other-problems': 'other-problems',
    'lua-dao': 'scam',
    'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu': 'investor-feedback-and-comments-mailbox',
    'danh-gia-tong-quat': 'general-review',
    'ly-do-khac': 'other-problems',
    'danh-gia-cua-ban': 'your-review',
    'gui-danh-gia': 'create-review',
    'create-review': 'create-review',
    'your-review': 'your-review',
  },
}

export const domain = {
  vi: process.env.NEXT_PUBLIC_SITE_URL,
  en: process.env.NEXT_PUBLIC_SITE_URL + 'en/',
}
