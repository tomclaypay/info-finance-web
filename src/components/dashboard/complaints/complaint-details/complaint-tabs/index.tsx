import { Tab, Tabs } from '@mui/material'
import { SyntheticEvent } from 'react'

interface ComplaintDetailsTabsProps {
  currentTab: string
  handleTabsChange: (event: SyntheticEvent<Element, Event>, value: string) => void
}

const tabs = [
  { label: 'Chi tiết', value: 'details' },
  { label: 'Lịch sử', value: 'logs' },
  { label: 'Lịch sử người xử lý', value: 'handle' },
]

export default function ComplaintDetailsTabs(props: ComplaintDetailsTabsProps) {
  const { currentTab, handleTabsChange } = props

  return (
    <Tabs
      indicatorColor="primary"
      onChange={handleTabsChange}
      scrollButtons={false}
      sx={{ mt: 3 }}
      textColor="primary"
      value={currentTab}
      variant="scrollable"
    >
      {tabs.map((tab) => (
        <Tab key={tab.value} label={tab.label} value={tab.value} />
      ))}
    </Tabs>
  )
}
