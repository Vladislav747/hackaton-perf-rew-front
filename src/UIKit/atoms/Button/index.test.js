import React from 'react'
import { shallow, mount } from 'enzyme'
import { enzymeFind } from 'styled-components/test-utils'
import Button from '.'

describe('<Button component />', () => {
  const wrap = (props = {}) => shallow(<Button {...props} />).dive()
  const wrapMount = (props = {}) => mount(<Button {...props} />)

  it('renders with different combination of props', () => {
    wrap({ disabled: true })
    wrap({ transparent: true })
    wrap({ disabled: true, transparent: true })
  })

  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' })
    expect(wrapper.contains('test')).toBe(true)
  })

  it('renders props when passed in', () => {
    const wrapper = wrap({ type: 'submit' })
    expect(wrapper.find({ type: 'submit' })).toHaveLength(1)
  })

  it('renders button by default', () => {
    const wrapper = wrapMount({ type: 'my_type' })
    expect(wrapper.find('button').find({ type: 'my_type' })).toHaveLength(1)
  })

  it('renders anchor when href is passed in', () => {
    const wrapper = wrapMount({ href: 'test' })
    expect(wrapper.find('a')).toHaveLength(1)
  })
})
