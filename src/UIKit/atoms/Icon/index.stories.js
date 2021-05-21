// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from '.'
import { ReactComponent as TestIcon } from './assets/test.svg'

storiesOf('UIKit/atoms/Icon', module)
    .add('default', () => <Icon icon={TestIcon} />)
    .add('secondary', () => <Icon icon={TestIcon} palette="secondary" />)
    .add('palette', () => <Icon icon={TestIcon} palette="primary" />)
    .add('height', () => <Icon icon={TestIcon} height={100} />)
