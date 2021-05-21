import styled, { css } from 'styled-components'
// @ts-ignore-start
import { palette, font } from 'styled-theme'
import { ifProp, switchProp } from 'styled-tools'

import Block from '../../Block'

const fontSize = ({ height }) => `${height / 35}rem`

export const InputLabelStyles = css`
  transition: all 0.2s ease;
  position: absolute;
  white-space: nowrap;
  overflow: hidden;
  color: ${palette('grayscale', 2)};
  pointer-events: none;
  font-size: ${fontSize};
  line-height: 1;
  left: 0.5rem;
  top: ${fontSize};
`

export const InputLabelTopStyles = css`
  display: inline;
  position: absolute;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-height: 0.5rem;
  max-width: 70%;
  color: ${palette('primary', 2)};
  background-color: #ffff;
  font-size: 0.5rem;
  line-height: 1;
  left: 0.5rem;
  top: -0.4rem;
  padding-top: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`

export const InputLabel = styled.span`
  ${props =>
    props.value !== undefined && props.value.length === 0
      ? InputLabelStyles
      : InputLabelTopStyles};
`
export const IconWrapper = styled.div`
  position: absolute;
  display: inline;
  top: 0.5rem;
  right: 0.4rem;
  color: ${switchProp('status', {
    invalid: palette('danger', 1),
    valid: palette('success', 1),
  })};
  font-size: 1.14285rem;
  font-size: ${fontSize};
`

export const styles = css`
  outline: none;
  font-family: ${font('primary')};
  display: block;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  font-size: ${fontSize};
  padding: 0.5rem;
  padding-right: ${ifProp('status', '1.8rem', '0.5rem')};
  height: ${ifProp({ type: 'textarea' }, 'auto', '2.2222222222em')};
  color: ${palette('grayscale', 1)};
  background-color: ${palette('grayscale', 0, true)};
  border: none;
  caret-color: ${palette('primary', 2)};
  border-radius: 0.3125rem 0.3125rem 0rem 0rem;
  border-bottom: 1px solid
    ${switchProp(
      'status',
      {
        invalid: palette('danger', 1),
        valid: palette('success', 1),
      },
      palette('grayscale', 3)
    )};
  caret-color: ${palette('primary', 2)};
  &[type='checkbox'],
  &[type='radio'] {
    display: inline-block;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 0.2rem 0 0;
  }
  &[type='textarea'] {
    border-radius: 0.3125rem;
    border: 1px solid ${palette('grayscale', 3)};
  }
  &:active,
  :focus {
    border: 1px solid ${palette('primary', 2)};
  }
  &:active + ${InputLabel}, :focus + ${InputLabel} {
    ${InputLabelTopStyles}
  }
  &::-webkit-input-placeholder {
    color: transparent;
  }
  &::-moz-placeholder {
    color: transparent;
  }
  &:-ms-input-placeholder {
    color: transparent;
  }
  &:active + ${IconWrapper}, :focus + ${IconWrapper} {
    display: none;
  }
`

export const StyledTextarea = styled.textarea`
  ${styles}
`
export const StyledSelect = styled.select`
  ${styles}
`
export const StyledInput = styled.input`
  ${styles}
`

export const InputContainer = styled(Block)`
  position: relative;
  width: 100%;
`
