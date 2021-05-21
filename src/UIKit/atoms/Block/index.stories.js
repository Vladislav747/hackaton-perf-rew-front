import React from 'react'
import { storiesOf } from '@storybook/react'
import Block from '.'

storiesOf('UIKit/atoms/Block', module)
    .add('default', () => (
        <Block>
            Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
        </Block>
    ))
    .add('palette primary', () => (
        <Block palette="primary">
            Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
        </Block>
    ))
