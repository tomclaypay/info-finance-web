import { Languages, Positions } from '@app/constants/banner'
import { Aggregate } from '../interfaces/common'

export interface Banner {
  link?: any
  id?: string
  position?: Positions
  language?: Languages
  url?: string
  [key: string]: any
}
export interface BannersListResponse {
  banners: Banner[]
  banner_aggregate?: Aggregate
}

export interface IImageObjectBanner {
  url: string
  imgType: string
  file?: Blob | MediaSource
  typeFile?: string
}
