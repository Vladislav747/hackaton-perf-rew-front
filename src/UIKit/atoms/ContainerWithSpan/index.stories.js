import React from 'react'
import { storiesOf } from '@storybook/react'
import ContainerWithSpan from './index'
import styled from 'styled-components'

const StoriesWrapper = styled.div`
    display: flex;
    width: 300px;
    height: 300px;
`

storiesOf('UIKit/atoms/ContainerWithSpan', module)
    .add('default', () => { return (
        <StoriesWrapper>
            <ContainerWithSpan spanPosition={'left'}/>
        </StoriesWrapper>
    )
})
