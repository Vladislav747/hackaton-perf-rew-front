import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '.'

storiesOf('UIKit/atoms/Button', module)
    .add('default', () => <Button>Button Text</Button>)
    .add('secondary', () => <Button palette="secondary">Button Text</Button>)
    .add('disabled', () => <Button disabled>Button Text</Button>)
    .add('transparent', () => <Button transparent>Button Text</Button>)
    .add('height', () => <Button height={100}>Button Text</Button>)
    .add('round right', () => <Button round="right">Button Text</Button>)
    .add('round disabled', () => <Button round="disabled">Button Text</Button>)
    .add('link', () => <Button href="#">Link</Button>)
