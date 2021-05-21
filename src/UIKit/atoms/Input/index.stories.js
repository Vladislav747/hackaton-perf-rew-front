import React from 'react'
import { storiesOf } from '@storybook/react'
import Input from '.'

storiesOf('UIKit/atoms/Input', module)
    .add('default', () => <Input />)
    .add('with Label', () => <Input label="label" />)
    .add('invalid', () => <Input status="invalid" label="label invalid" />)
    .add('valid', () => <Input status="valid" />)
    .add('type textarea', () => <Input type="textarea" />)
    .add('type checkbox', () => <Input type="checkbox" />)
    .add('type radio', () => <Input type="radio" />)
    .add('height', () => <Input height={100} />)
    .add('type select', () => (
        <Input type="select">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
        </Input>
    ))
