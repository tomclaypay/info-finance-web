export const rangeButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  borderRadius: 1.25,
}

export const activeRangeButtonAllStyle = {
  ...rangeButtonStyle,
  background: '#F4F8FF',
  color: '#2A559C',
}

export const activeRangeButton0_3Style = {
  ...rangeButtonStyle,
  background: '#FF424214',
  color: '#FF4242',
}

export const activeRangeButton4_6Style = {
  ...rangeButtonStyle,
  background: '#FFF9E5',
  color: '#FFC700',
}

export const activeRangeButton7_10Style = {
  ...rangeButtonStyle,
  background: '#D9F9EA',
  color: '#00C868',
}

export const normalRangeButtonAllStyle = {
  ...rangeButtonStyle,
  background: '#FAFAFA',
  color: '#A0A4AB',
  ':hover': { background: '#F4F8FF', color: '#2A559C' },
}

export const normalRangeButton0_3Style = {
  ...rangeButtonStyle,
  background: '#FAFAFA',
  color: '#A0A4AB',
  ':hover': { background: '#FF424214', color: '#FF4242' },
}

export const normalRangeButton4_6Style = {
  ...rangeButtonStyle,
  background: '#FAFAFA',
  color: '#A0A4AB',
  ':hover': { background: '#FFF9E5', color: '#FFC700' },
}

export const normalRangeButton7_10Style = {
  ...rangeButtonStyle,
  background: '#FAFAFA',
  color: '#A0A4AB',
  ':hover': { background: '#D9F9EA', color: '#00C868' },
}

export const rangeTypographyStyle = {
  width: '100%',
  textAlign: 'center',
  fontWeight: 600,
  fontSize: 14,
}

export const layoutButtonStyle = {
  height: 40,
  borderRadius: 1.25,
  ':hover': { background: '#F4F8FF', color: '#2A559C' },
}

export const activeLayoutButtonStyle = {
  ...layoutButtonStyle,
  background: '#F4F8FF',
  color: '#2A559C',
  fontSize: '14px',
}
export const normalLayoutButtonStyle = {
  ...layoutButtonStyle,
  background: '#F5F6F7',
  color: '#A0A4AB',
  fontSize: '14px',
}
