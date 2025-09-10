import { SCORE_RANGE } from '@app/constants/exchange'
import { WebsiteOption } from '@app/interfaces/common'

export const getParamScoreFromKey = (key: string) => {
  switch (key) {
    case SCORE_RANGE['0_3']:
      return {
        _lt: 4,
      }
    case SCORE_RANGE['4_6']:
      return {
        _lt: 7,
        _gte: 4,
      }
    case SCORE_RANGE['7_10']:
      return {
        _gte: 7,
      }
    default:
      return {
        _gte: null,
        _lte: null,
      }
  }
}

export const getColorFromScore = (score: number) => {
  if (score < 4) return { background: '#FF424214', color: '#FF4242' }
  else if (score >= 4 && score < 7) {
    return { background: '#FFF9E5', color: '#FFC700' }
  } else if (score >= 7) {
    return { background: '#D9F9EA', color: '#00C868' }
  }
}

export const getColorDetailExchangeFromScore = (score: number) => {
  if (score < 4) return { primary: '#FF1F00', second: '#FFE9E5' }
  else if (score >= 4 && score < 7) {
    return { primary: '#FFC700', second: '#FFF9E5' }
  } else if (score >= 7) {
    return { primary: '#00C868', second: '#F1FFF8' }
  }
}

export const formatScore = (score: number) => score.toFixed(2)

export const getIconFlagFromNationId = (nationId: string, nationalOption: WebsiteOption[]) =>
  nationalOption?.find((nation) => nation.value === nationId)?.logo

export const getDomainFromUrl = (url: string | null | undefined) => {
  if (!url) return ''
  const match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im)

  return match?.[1] ?? ''
}
