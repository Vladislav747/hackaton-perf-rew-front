import React from 'react'
import { storiesOf } from '@storybook/react'
import FullscreenCarusel from './index.tsx'
import { lst } from './testData'

storiesOf('UIKit/atoms/FullscreenCarusel', module)
    .add('default', () => <FullscreenCarusel elementsGridNum={5} rawCamerasList={lst} screenChangeDelayInSec={20}/>)