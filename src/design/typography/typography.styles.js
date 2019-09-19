import styled from 'styled-components'
import { FONT_SIZE, FONT_BOLD, FONT_REGULAR } from './typography.constants'
import { COLOR } from '../color/color.constants'
import { SPACING } from '../spacing/spacing.constants'

const HeadingXL = styled.h1`
  margin: 0 0 ${SPACING.XS} 0;
  ${FONT_BOLD}
  font-size: ${FONT_SIZE.XXLARGE};
  line-height: 28px;
  color: ${COLOR.BLACK};
`
HeadingXL.displayName = 'HeadingXL'

const HeadingL = styled.h2`
  margin: 0 0 ${SPACING.XS} 0;
  ${FONT_BOLD}
  font-size: ${FONT_SIZE.XLARGE};
  line-height: 28px;
  color: ${COLOR.BLACK};
`
HeadingL.displayName = 'HeadingL'

const Heading = styled.h3`
  margin: 0 0 ${SPACING.XS} 0;
  ${FONT_BOLD}
  font-size: ${FONT_SIZE.LARGE};
  line-height: 24px;
  color: ${COLOR.BLACK};
`
Heading.displayName = 'Heading'

const HeadingSmall = styled.h4`
  margin: 0 0 ${SPACING.XS} 0;
  ${FONT_BOLD}
  font-size: ${FONT_SIZE.MEDIUM};
  line-height: 20px;
  color: ${COLOR.BLACK};
`
HeadingSmall.displayName = 'HeadingSmall'

const BodyBold = styled.p`
  margin: 0 0 ${SPACING.XS} 0;
  ${FONT_BOLD}
  font-size: ${FONT_SIZE.MEDIUM};
  line-height: 20px;
  color: ${COLOR.BLACK};
`
BodyBold.displayName = 'BodyBold'

const Body = styled.p`
  margin: 0 0 ${SPACING.XS} 0;
  ${FONT_REGULAR}
  font-size: ${FONT_SIZE.MEDIUM};
  line-height: 20px;
  color: ${COLOR.BLACK};
`
Body.displayName = 'Body'

const TextLinkStyles = `
  color: ${COLOR.BLUE_MEDIUM};
  text-decoration: none;

  &:hover, &:focus {
    text-decoration: underline;
  }
`

const TextLink = styled.a`
  ${TextLinkStyles}
`
TextLink.displayName = 'Link'

const SmallText = styled.p`
  margin: 0 0 ${SPACING.XS} 0;
  ${FONT_REGULAR}
  font-size: ${FONT_SIZE.SMALL};
  line-height: 16px;
  color: ${COLOR.GREY_DARK};
`
SmallText.displayName = 'SmallText'

export {
  HeadingXL,
  HeadingL,
  Heading,
  HeadingSmall,
  BodyBold,
  Body,
  TextLinkStyles,
  TextLink,
  SmallText,
}
