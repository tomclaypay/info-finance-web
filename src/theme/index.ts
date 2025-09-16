// theme/index.ts
import { createTheme as createMuiTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles'
import { baseThemeOptions } from './base-theme-options'
import { darkThemeOptions } from './dark-theme-options'
import { lightThemeOptions } from './light-theme-options'

type CreateThemeConfig = {
  direction: 'ltr' | 'rtl'
  mode: 'light' | 'dark'
  responsiveFontSizes?: boolean
  /** CSS font-family string, ví dụ: `var(--font-montserrat), var(--font-roboto), sans-serif` */
  fontFamily?: string
}

export const createTheme = (config: CreateThemeConfig) => {
  // const modeOptions: ThemeOptions = config.mode === 'dark' ? darkThemeOptions : lightThemeOptions
  const modeOptions: ThemeOptions = lightThemeOptions

  let theme = createMuiTheme(baseThemeOptions, modeOptions, {
    // đảm bảo mode & direction đúng
    direction: config.direction,
    palette: { mode: config.mode },
    // đưa CSS vars từ next/font vào MUI
    typography: {
      ...(baseThemeOptions as any)?.typography,
      fontFamily:
        config.fontFamily ??
        `var(--font-montserrat), var(--font-roboto), -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`,
    },
  })

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return theme
}
