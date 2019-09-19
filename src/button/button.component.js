import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { COLOR } from '../design/color/color.constants'
import { FONT_SIZE, FONT_BOLD } from '../design/typography/typography.constants'
import { SPACING } from '../design/spacing/spacing.constants'

const Button = styled.button`
  ${FONT_BOLD};
  font-size: ${props => props.size === 'large' ? FONT_SIZE.LARGE : FONT_SIZE.MEDIUM};
  line-height: ${props => props.size === 'large' ? FONT_SIZE.LARGE : FONT_SIZE.MEDIUM};
  color: ${props => props.disabled ? COLOR.GREY_DARK : (props.buttonType === 'primary' || props.type === 'primary' ? COLOR.WHITE : COLOR.BLACK)};
  background-color: ${props => props.disabled ? COLOR.GREY_LIGHTER : (props.buttonType === 'primary' || props.type === 'primary' ? COLOR.BLUE_MEDIUM : COLOR.WHITE)};
  padding: ${props => props.size === 'large' ? SPACING.M : SPACING.S};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.disabled ? COLOR.GREY_LIGHT : (props.buttonType === 'primary' || props.type === 'primary' ? COLOR.BLUE_MEDIUM : COLOR.GREY_LIGHT)};
  border-radius: 4px;
  outline: none;
  ${props => props.disabled ? '' : 'cursor: pointer;'}

  &:hover {
    background-color: ${props => props.disabled ? COLOR.GREY_LIGHTER : (props.buttonType === 'primary' || props.type === 'primary' ? '#007aac' : '#ebeded')};
  }

  &:active {
    box-shadow: inset 0 1px 4px 0 ${props => props.buttonType === 'primary' || props.type === 'primary' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 18, 26, 0.1)'};
  }
`

Button.displayName = 'Button'

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  dataTestid: PropTypes.string,
}

Button.defaultProps = {
  type: 'primary',
  size: 'small',
}

export { Button }
