import styled from 'styled-components'

export const MainCamerasContainer = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    transition: height .3s ease-in;
    ::-webkit-scrollbar {
        width: 1px;
    }
`

export const FullscreenWrapper = styled.div`
`