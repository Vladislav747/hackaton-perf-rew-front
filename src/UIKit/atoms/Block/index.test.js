import React from 'react'
import { shallow } from 'enzyme'
import Block from '.'

const wrap = (props = {}) => shallow(<Block {...props} />)

describe('<Block component />', () => {
  it('Block component renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' })
    expect(wrapper.contains('test')).toBe(true)
  })

  it('Block component renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' })
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
  })
})
