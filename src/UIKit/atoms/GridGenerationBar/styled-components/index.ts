import styled from 'styled-components'

export const BarElement = styled.span`
    cursor: pointer;
    width: 100%;
    padding: 0.5em 0;
    &.active{
        background: #BBDCFF;
        font-size: 600;
    }
    &:hover{
        background: #BBDCFF;
        font-size: 600;
    }
`

export const BarTitle = styled.span`
    font-weight: 600;
    font-size: 1.1em;
    margin-bottom: 1em;
`

export const BarWrapper = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    width: auto;
    justify-content: space-around;
    align-items: center;
    color: #4D4D4D;
    font-size: 16px;
    text-align: center;
`
