import styled from 'styled-components'
import { palette } from 'styled-theme'
import Checkbox from 'rc-checkbox'

import Atom from '../../../../UIKit/atoms/Atom'

export const Container = styled.div`
    width: 100%;
    transition: background-color 0.5 ease-in;
    box-sizing: border-box;
    &:hover {
        background-color: ${palette('grayscale', 6)};
    }
`

export const IconContainer = styled.div`
    cursor: pointer;
    width: 1.2em;
    height: 1.2em;
    & svg {
        width: 1.2em;
        height: 1.2em;
        fill: ${palette('grayscale', 2)};
        stroke: none;
    }
`
export const Wrapper = styled.div`
    cursor: pointer;
    padding: 1em 0 1em 1.2em;
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
export const TitleContainer = styled.div`
    padding-left: 0.8em;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-overflow: ellipsis;
    white-space: wrap;
`

export const Title = styled(Atom)`
    flex-grow: 1;
    overflow: hidden;
    display: inline;
    text-overflow: ellipsis;
    white-space: wrap;
`
export const SubTitle = styled(Atom)`
    font-size: 0.9em;
    color: ${palette('grayscale', 3)};
    overflow: hidden;
    display: inline;
    text-overflow: ellipsis;
    white-space: wrap;
`

export const SubTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

export const CheckboxStyled = styled(Checkbox)`
    padding: 0 1em;
`