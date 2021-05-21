import React from 'react'
import { storiesOf } from '@storybook/react'
import Timeline from './index'

storiesOf('UIKit/atoms/Timeline', module)
    .add('default', () => { return (<Timeline fullSelectedDate={new Date(2020, 7, 24, 12, 33)}/>) })
