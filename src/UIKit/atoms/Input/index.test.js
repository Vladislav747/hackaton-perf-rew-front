import React from 'react'
import { shallow, mount } from 'enzyme'
import Input from '.'

describe('<Input component />', () => {
  const wrap = (props = {}) => shallow(<Input {...props} />).dive()
  const wrapMount = (props = {}) => mount(<Input {...props} />)

  it('renders props when passed in', () => {
    const wrapper = wrap({ type: 'text' })
    expect(wrapper.find({ type: 'text' })).toHaveLength(1)
  })

  it('renders input by default', () => {
    const wrapper = wrapMount()
    expect(wrapper.find('input')).toHaveLength(1)
  })

  it('renders select when type is select', () => {
    const wrapper = wrapMount({ type: 'select' })
    expect(wrapper.find('select')).toHaveLength(1)
  })

  it('renders textarea when type is textarea', () => {
    const wrapper = wrapMount({ type: 'textarea' })
    expect(wrapper.find('textarea')).toHaveLength(1)
  })
})
