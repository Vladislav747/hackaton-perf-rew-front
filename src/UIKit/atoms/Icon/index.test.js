// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from 'react'
import { shallow } from 'enzyme'
import Icon from '.'
import { ReactComponent as TestIcon } from './assets/test.svg'

const wrap = (props = {}) => shallow(<Icon icon={TestIcon} {...props} />).dive()

it('renders with different combination of props', () => {
    wrap({ height: 40 })
})

it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' })
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})
