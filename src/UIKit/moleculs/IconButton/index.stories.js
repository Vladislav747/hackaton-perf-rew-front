import React from 'react'
import { storiesOf } from '@storybook/react'
import IconButton from '../IconButton'
import { ReactComponent as TestIcon } from '../../atoms/Icon/assets/test.svg'

storiesOf('UIKit/moleculs/IconButton', module)
    .add('default', () => <IconButton icon={TestIcon}>Hello</IconButton>)
    .add('transparent', () => (
        <IconButton icon={TestIcon} transparent>
            Hello
        </IconButton>
    ))
    .add('with icon on right', () => (
        <IconButton icon={TestIcon} right>
            Hello
        </IconButton>
    ))
    .add('responsive', () => (
        <IconButton icon={TestIcon} responsive>
            Decrease panel width
        </IconButton>
    ))
    .add('responsive with breakpoint', () => (
        <IconButton icon={TestIcon} breakpoint={300} responsive>
            Decrease panel width to 300
        </IconButton>
    ))
    .add('without text', () => <IconButton icon={TestIcon} />)
    .add('collapsed', () => (
        <IconButton icon={TestIcon} collapsed>
            Hello
        </IconButton>
    ))
    .add('height', () => (
        <IconButton icon={TestIcon} height={100}>
            Hello
        </IconButton>
    ))
