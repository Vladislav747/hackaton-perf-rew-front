import React from 'react'
import { storiesOf } from '@storybook/react'
import Spinner from '.'

storiesOf('UIKit/atoms/Spinner', module)
    .add('default', () => <Spinner />)
    .add('reverse', () => <Spinner reverse />)
    .add('secondary', () => <Spinner palette="secondary" />)
