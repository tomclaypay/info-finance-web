export const TRADING_PLATFORM_OPTIONS_EN = ['MT4', 'MT4 White Label', 'MT5', 'MT5 White Label', 'Webtrader']
export const TRADING_PLATFORM_OPTIONS = ['MT4', 'MT4 Nhãn trắng', 'MT5', 'MT5 Nhãn trắng', 'Webtrader']

export const TranslateTradingPlatform = (value: any[]) => {
  if (value.length > 0) {
    const tradingPlatformEn = value.map((item) => {
      switch (item) {
        case 'MT4':
          return 'MT4'
        case 'MT4 Nhãn trắng':
          return 'MT4 White Label'
        case 'MT5':
          return 'MT5'
        case 'MT5 Nhãn trắng':
          return 'MT5 White Label'
        case 'Webtrader':
          return 'Webtrader'
      }
    })
    return tradingPlatformEn
  } else return []
}

export const TRADING_PRODUCTION_OPTIONS = [
  'Ngoại hối',
  'Chỉ số',
  'Cổ phiếu',
  'Hàng hóa',
  'Kim loại',
  'ETFs',
  'Tiền điện tử',
  'Hợp đồng tương lai',
  'Hợp đồng chênh lệch',
  'Năng lượng',
  'Trái phiếu',
  'Chỉ số Thematic',
]

export const TRADING_PRODUCTION_OPTIONS_EN = [
  'Forex',
  'Indicies',
  'Stock',
  'Commodities',
  'Metals',
  'ETFs',
  'Cryptocurrencies',
  'Futures',
  'CFDs',
  'Energy',
  'Bonds',
  'Thematic Indices',
]

export const TranslateTradingProduction = (value: any[]) => {
  if (value.length > 0) {
    const tradingProductionEn = value.map((item) => {
      switch (item) {
        case 'Ngoại hối':
          return 'Forex'
        case 'Chỉ số':
          return 'Indicies'
        case 'Cổ phiếu':
          return 'Stock'
        case 'Hàng hóa':
          return 'Commodities'
        case 'Kim loại':
          return 'Metals'
        case 'ETFs':
          return 'ETFs'
        case 'Tiền điện tử':
          return 'Cryptocurrencies'
        case 'Hợp đồng tương lai':
          return 'Futures'
        case 'Hợp đồng chênh lệch':
          return 'CFDs'
        case 'Năng lượng':
          return 'Energy'
        case 'Trái phiếu':
          return 'Bonds'
        case 'Chỉ số Thematic':
          return 'Thematic Indices'
      }
    })
    return tradingProductionEn
  } else return []
}

export const SUPERVISOR_STATUS_OPTIONS = [
  'Có giám sát quản lý',
  'Giám sát quản lý từ xa',
  'Không giám sát quản lý',
  'Tạm thời không có giám sát quản lý',
  'Không rút được tiền',
  'Tập trung khiếu nại',
  'Nghi ngờ doanh nghiệp giả mạo',
  'Kinh doanh vượt quyền',
  'Tạm thời không hoạt động',
  'Sàn lừa đảo',
  'Nghi ngờ giả mạo',
  'Đã chạy trốn',
  'Chấm dứt Kinh doanh',
]
export const SUPERVISOR_STATUS_OPTIONS_EN = [
  'Regulated',
  'Offshore Regulatory',
  'Non-regulatory',
  'Temporarily Non-regulatory',
  'Unable to Withdraw Funds',
  'Complaint Filing',
  'Suspicious Clone Firm',
  'Exceeded',
  'Temporarily Inactive',
  'Broker Scams',
  'Suspicious Clone',
  'Broker Runaway',
  'Termination of Business',
]
export const TranslateSupervisorStatus = (value: string) => {
  switch (value) {
    case 'Có giám sát quản lý':
      return 'Regulated'
    case 'Giám sát quản lý từ xa':
      return 'Offshore Regulatory'
    case 'Không giám sát quản lý':
      return 'Non-regulatory'
    case 'Tạm thời không có giám sát quản lý':
      return 'Temporarily Non-regulatory'
    case 'Không rút được tiền':
      return 'Unable to Withdraw Funds'
    case 'Tập trung khiếu nại':
      return 'Complaint Filing'
    case 'Nghi ngờ doanh nghiệp giả mạo':
      return 'Suspicious Clone Firm'
    case 'Kinh doanh vượt quyền':
      return 'Exceeded'
    case 'Tạm thời không hoạt động':
      return 'Temporarily Inactive'
    case 'Sàn lừa đảo':
      return 'Broker Scams'
    case 'Nghi ngờ giả mạo':
      return 'Suspicious Clone'
    case 'Đã chạy trốn':
      return 'Broker Runaway'
    case 'Chấm dứt Kinh doanh':
      return 'Termination of Business'
  }
}

export const SUPERVISOR_TIME_OPTIONS = ['Dưới 1 năm', '1 - 5 năm', '5 - 10 năm', '10 - 15 năm', 'Trên 15 năm']
export const SUPERVISOR_TIME_OPTIONS_EN = [
  'Less than 1 year',
  '1 - 5 years',
  '5 - 10 years',
  '10 - 15 years',
  'Over 15 years',
]
export const TranslateSupervisorTime = (value: string) => {
  switch (value) {
    case 'Dưới 1 năm':
      return 'Less than 1 year'
    case '1 - 5 năm':
      return '1 - 5 years'
    case '5 - 10 năm':
      return '5 - 10 years'
    case '10 - 15 năm':
      return '10 - 15 years'
    case 'Trên 15 năm':
      return 'Over 15 years'
  }
}

export const LICENSE_STATUS_OPTIONS = [
  'Có giám sát quản lý',
  'Giám sát quản lý từ xa',
  'Không giám sát quản lý',
  'Tạm thời không có giám sát quản lý',
  'Kinh doanh vượt quyền',
  'Nghi ngờ giả mạo',
  'Giấy phép Tạm thời',
  'Chưa được cấp phép',
  'Thu hồi giấy phép',
]
export const LICENSE_STATUS_OPTIONS_EN = [
  'Regulated',
  'Offshore Regulatory',
  'Non-regulatory',
  'Temporarily Non-regulatory',
  'Exceeded',
  'Suspicious Clone',
  'Temporary Permission',
  'Unlicensed',
  'License Revoked',
]

export const TranslateLicenseStatus = (value: string) => {
  switch (value) {
    case 'Có giám sát quản lý':
      return 'Regulated'
    case 'Giám sát quản lý từ xa':
      return 'Offshore Regulatory'
    case 'Không giám sát quản lý':
      return 'Non-regulatory'
    case 'Tạm thời không có giám sát quản lý':
      return 'Temporarily Non-regulatory'
    case 'Kinh doanh vượt quyền':
      return 'Exceeded'
    case 'Nghi ngờ giả mạo':
      return 'Suspicious Clone'
    case 'Giấy phép Tạm thời':
      return 'Temporary Permission'
    case 'Chưa được cấp phép':
      return 'Unlicensed'
    case 'Thu hồi giấy phép':
      return 'License Revoked'
  }
}

export const FILTER_KEY = {
  KEYWORD: 'keyword',
  LAYOUT: 'layout',
  SCORE_RANGE: 'scores-range',
}

export const LAYOUT_TYPE = {
  GRID: 'grid',
  LIST: 'list',
}

export const SCORE_RANGE = {
  ALL: 'all',
  '0_3': '0-3',
  '4_6': '4-6',
  '7_10': '7-10',
}
