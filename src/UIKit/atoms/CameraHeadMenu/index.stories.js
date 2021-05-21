import React from 'react'
import { storiesOf } from '@storybook/react'
import CameraHeadMenu from './index'

storiesOf('UIKit/atoms/CameraHeadMenu', module)
    .add('archive unselected', () => { return (<CameraHeadMenu height='50px' width='600px' type='archive' cameraName='Адрес камеры'/>) })
    .add('archive selected', () => { return (<CameraHeadMenu height='50px' width='600px' type='archive' selected='true' cameraName='Адрес камеры'/>) })
