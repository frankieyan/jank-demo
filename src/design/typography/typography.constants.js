const FONT_SIZE = {
  SMALL: '12px',
  MEDIUM: '14px',
  LARGE: '16px',
  XLARGE: '20px',
  XXLARGE: '24px',
}

const FONT_WEIGHT = {
  REGULAR: '400',
  BOLD: '700',
}

const DEFAULT_FONT_STACK = `
  font-family: 'Lato', 'Lucida Grande', 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
`

const FONT_BOLD = `
  ${DEFAULT_FONT_STACK}
  font-weight: ${FONT_WEIGHT.BOLD};
`

const FONT_REGULAR = `
  ${DEFAULT_FONT_STACK}
  font-weight: ${FONT_WEIGHT.REGULAR};
`

export {
  FONT_SIZE,
  FONT_WEIGHT,
  DEFAULT_FONT_STACK,
  FONT_BOLD,
  FONT_REGULAR,
}
