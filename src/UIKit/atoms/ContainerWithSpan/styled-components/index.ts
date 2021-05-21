import styled from 'styled-components'

import {ContainerWithSpanWrapperProps} from "../ContainerWithSpan.d"

export const ContainerWithSpanWrapper = styled.div<ContainerWithSpanWrapperProps>`
    position: absolute;
    display: ${(p: any) => p.visibility ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    border-radius: 10px 0px 10px 10px;
    box-shadow: 0px 5px 15px rgba(57,57,58,0.15);
    width: 200px;
    min-height: 130px;
    padding: 20px;
    top: 26px;
    right: -90px;
    z-index: 1;
`
