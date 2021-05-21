import React from 'react'
import { storiesOf } from '@storybook/react'
import Heading from '.'

storiesOf('UIKit/atoms/Heading', module)
    .add('default', () => <Heading>Заголовок H4</Heading>)
    .add('primary', () => <Heading palette="primary">Заголовок H4</Heading>)
    .add('level 1', () => <Heading level={1}>Заголовок H1</Heading>)
    .add('level 2', () => <Heading level={2}>Заголовок H2</Heading>)
    .add('level 3', () => <Heading level={3}>Заголовок H3</Heading>)
