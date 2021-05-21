import React from 'react'
import styled, { keyframes } from 'styled-components'

const loadind = keyframes`
    100% {
        transform: translateX(100%);
    }
`

const SceletonContainer = styled.figure`
    position: relative;
    background-color: #e2e2e2;

    margin: 0;
    padding: 0;
    overflow: hidden;

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

const LoadContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const LoadGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(248px, 1fr));
    grid-template-rows: repeat(6, minmax(154px, 1fr));
    grid-gap: 8px;
    height: 100%;
    & > figure {
        content: '';
        border-radius: 5px;
    }
`

const CameraGridLoadEffect = props => {
    return (
        <LoadContainer
            style={{
                height: props.sizeParams.height,
                width: props.sizeParams.width
            }}
        >
                <LoadGrid>
                    <SceletonContainer
                        style={{ gridColumn: '1/4', gridRow: '1/4' }}
                    ></SceletonContainer>
                    {Array.from(Array(16), (_, i) => (
                        <SceletonContainer key={i} />
                    ))}
                </LoadGrid>
        </LoadContainer>
    )
}

export default CameraGridLoadEffect
