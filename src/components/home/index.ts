import dynamic from 'next/dynamic'

export const HomeSupport = dynamic(() => import('./HomeSupport').then((m) => m.default))
export const HomeSlider = dynamic(() => import('./HomeSlider').then((m) => m.default))
export const HomePopup = dynamic(() => import('./HomePopup').then((m) => m.default))
export const HomeSliderNews = dynamic(() => import('./HomeSliderNews').then((m) => m.default))
export const HomeSliderEvents = dynamic(() => import('./HomeSliderEvent').then((m) => m.default))
export const HomeExchangeReview = dynamic(() => import('./HomeExchangeReview').then((m) => m.default))
