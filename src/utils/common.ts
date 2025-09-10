import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { UserOption } from '@app/interfaces/common'
import { ComplaintCategory } from '@app/interfaces/complaint'
import { CsTeam } from '@app/interfaces/cs-team'
import { Exchange } from '@app/interfaces/exchange'
import { National } from '@app/interfaces/national'
import { Supervisor } from '@app/interfaces/supervisor'
import { Seeder, User } from '@app/interfaces/user'

export const formatOptions = (options?: Array<Exchange | National | ComplaintCategory | CsTeam | Supervisor>) => {
  return options?.map((option) => {
    return {
      label: option.name,
      value: option.id,
      logo: option?.logo,
    }
  })
}

export const formatSupervisorOptions = (
  options?: Array<Exchange | National | ComplaintCategory | CsTeam | Supervisor>
) => {
  return options?.map((option) => {
    return {
      label: option.abbreviation_name,
      value: option.id,
    }
  })
}

export const formatUserOptions = (options?: Array<User>) => {
  return options?.map((option) => {
    return {
      label: option.displayName || '',
      value: option.id || '',
      email: option.email || '',
      phone: option.phone || '',
    } as UserOption
  })
}

export const formatSeederOptions = (options?: Array<Seeder>) => {
  return options?.map((option) => {
    return {
      label: option.fullname || '',
      value: option.id || '',
      email: option.email || '',
    } as UserOption
  })
}

export const checkComplaintStatus = (status?: COMPLAINT_STATUS) => {
  switch (status) {
    case COMPLAINT_STATUS.PENDING:
    case COMPLAINT_STATUS.ACCEPTED:
    case COMPLAINT_STATUS.APPROVED:
    case COMPLAINT_STATUS.CONTRACT_REQUESTED:
    case COMPLAINT_STATUS.IN_PROGRESS:
    case COMPLAINT_STATUS.RESOLVED:
      return true

    case COMPLAINT_STATUS.DECLINED:
    case COMPLAINT_STATUS.REJECTED:
    case COMPLAINT_STATUS.CLOSED:
      return false

    default:
      return false
  }
}

export const getComplaintGroupAction = (newStatus: COMPLAINT_STATUS, oldStatus?: COMPLAINT_STATUS) => {
  switch (newStatus) {
    case COMPLAINT_STATUS.PENDING:
      return 'Người dùng gửi khiếu nại'
    case COMPLAINT_STATUS.ACCEPTED:
    case COMPLAINT_STATUS.DECLINED:
      return 'Nhận khiếu nại?'
    case COMPLAINT_STATUS.APPROVED:
    case COMPLAINT_STATUS.REJECTED:
      return 'Duyệt khiếu nại?'
    case COMPLAINT_STATUS.CONTRACT_REQUESTED:
      return 'User đồng ý hợp tác?'
    case COMPLAINT_STATUS.IN_PROGRESS:
      return 'Đang xử lý yêu cầu'
    case COMPLAINT_STATUS.RESOLVED:
      return 'Xử lý yêu cầu thành công?'
    case COMPLAINT_STATUS.CLOSED:
      if (oldStatus) {
        switch (oldStatus) {
          case COMPLAINT_STATUS.APPROVED:
            return 'User đồng ý hợp tác?'
          case COMPLAINT_STATUS.IN_PROGRESS:
            return 'Xử lý yêu cầu thành công?'
          default:
            return 'Yêu cầu đã được huỷ'
        }
      }
    default:
      return ''
  }
}

export const getNextComplaintGroupAction = (status: COMPLAINT_STATUS) => {
  switch (status) {
    case COMPLAINT_STATUS.PENDING:
      return 'Nhận khiếu nại?'
    case COMPLAINT_STATUS.ACCEPTED:
      return 'Duyệt khiếu nại?'
    case COMPLAINT_STATUS.APPROVED:
      return 'User đồng ý hợp tác?'
    case COMPLAINT_STATUS.IN_PROGRESS:
      return 'Xử lý yêu cầu thành công?'
    default:
      return ''
  }
}

export const reorder = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const convertNameToSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/([-])\s+/g, '') // Loại bỏ khoảng trắng sau dấu "-"
    .replace(/\s+([-])/g, '') // Loại bỏ khoảng trắng trc dấu "-"
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[?,:&%'"`’‘+()]/g, '')
    .replace(/[/.]/g, '-')
    .trim()
    .split(' ')
    .join('-')
}

export const removeHtmlTagsAndEntities = (str: string) => {
  return str.replace(/<[^>]*>|&[a-z]+;?/gi, '')
}

export const mappedReviewCategorySlug = (reviewCategorySlug: string): string =>
  reviewCategorySlug === 'lua-dao' || reviewCategorySlug === 'scam'
    ? 'lua-dao'
    : reviewCategorySlug === 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu' ||
      reviewCategorySlug === 'investor-feedback-and-comments-mailbox'
    ? 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu'
    : reviewCategorySlug === 'danh-gia-tong-quat' || reviewCategorySlug === 'general-review'
    ? 'danh-gia-tong-quat'
    : reviewCategorySlug === 'ly-do-khac' || reviewCategorySlug === 'other-problems'
    ? 'ly-do-khac'
    : reviewCategorySlug

export const mappedReviewCategoryStatusBySlug = (reviewCategorySlug: string) => {
  return reviewCategorySlug === 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu'
    ? [
        COMPLAINT_STATUS.RESOLVED,
        COMPLAINT_STATUS.REJECTED,
        COMPLAINT_STATUS.PENDING,
        COMPLAINT_STATUS.IN_PROGRESS,
        COMPLAINT_STATUS.DECLINED,
        COMPLAINT_STATUS.CONTRACT_REQUESTED,
        COMPLAINT_STATUS.CLOSED,
        COMPLAINT_STATUS.ACCEPTED,
      ]
    : reviewCategorySlug === 'danh-gia-tong-quat'
    ? [COMPLAINT_STATUS.APPROVED]
    : []
}
export const mappedReviewCategorySlugByLocale = (reviewCategorySlug: string, locale: string) =>
  reviewCategorySlug === 'lua-dao'
    ? locale === 'vi'
      ? 'lua-dao'
      : 'scam'
    : reviewCategorySlug === 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu'
    ? locale === 'vi'
      ? 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu'
      : 'investor-feedback-and-comments-mailbox'
    : reviewCategorySlug === 'danh-gia-tong-quat'
    ? locale === 'vi'
      ? 'danh-gia-tong-quat'
      : 'general-review'
    : reviewCategorySlug === 'ly-do-khac'
    ? locale === 'vi'
      ? 'ly-do-khac'
      : 'other-problems'
    : reviewCategorySlug
