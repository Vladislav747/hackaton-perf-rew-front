import React from 'react'
import { shallow } from 'enzyme'
import Atom from '.'

describe('<Atom component />', () => {
  const wrap = (props = {}) => shallow(<Atom {...props} />)

  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'children' })
    expect(wrapper.contains('children')).toBe(true)
  })

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' })
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
  })
})
