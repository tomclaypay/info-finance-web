import React, { createContext, ReactNode, useState } from 'react'

export const BannerContext = createContext(null)

const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [banner, setBanner] = useState(null)

  return <BannerContext.Provider value={{ banner, setBanner }}>{children}</BannerContext.Provider>
}
export default BannerProvider
