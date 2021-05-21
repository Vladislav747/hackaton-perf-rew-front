import React from 'react'
import styled, {keyframes} from 'styled-components'

const loadind = keyframes`
    100% {
        transform: translateX(100%);
    }
`

const Sceleton = styled.figure`
    position: relative;
    background-color: #e2e2e2;

    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px 10px 10px 10px;
    display: block;

    &::after {
        display: block;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(
            90deg,
            transparent,
            rgba(162, 159, 159, 0.2),
            transparent
        );
        animation: ${loadind} 1.5s infinite;
    }
`

const SceletonContainer = (props: any) => {
    return (
        <div style={{width: props.width, height: props.height}}>
            <Sceleton/>
        </div>
    )

}

export default SceletonContainer