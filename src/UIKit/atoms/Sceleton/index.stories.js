import React from 'react'
import { storiesOf } from '@storybook/react'
import SceletonContainer from './index'

storiesOf('UIKit/atoms/Sceleton', module)
    .add('default', () => { return (<SceletonContainer height='200px' width='200px'/>) })
