import styled from 'styled-components'

export const PlayButtonContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background: rgba(57, 57, 58, 0.7);
    cursor: pointer;
`

export const PlayBtnWrapper = styled.span`
    display: inline-block;
    color: currentcolor;
    width: 3rem;
    height: 3rem;
    box-sizing: border-box;
    cursor: pointer;
    & > svg {
        width: 100%;
        height: 100%;
        fill: currentcolor;
        stroke: none;
    }
`