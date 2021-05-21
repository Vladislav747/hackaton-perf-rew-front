import React from 'react'
import { storiesOf } from '@storybook/react'
import GridGenerationBar from './index'
import styled from 'styled-components'

const StoriesWrapper = styled.div`
    display: flex;
    width: 300px;
    height: 300px;
`

storiesOf('UIKit/atoms/GridGenerationBar', module)
    .add('default', () => { return (
        <StoriesWrapper>
            <GridGenerationBar visibility={true}/>
        </StoriesWrapper>
    )
})
