import dynamic from 'next/dynamic'

export const Chart = dynamic(() => import('react-apexcharts').then((m) => m.default), { ssr: false })
