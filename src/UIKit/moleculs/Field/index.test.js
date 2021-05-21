import React from 'react'
import { shallow, mount } from 'enzyme'
import Field from '.'

describe('<Field component />', () => {
  const wrap = (props = {}) => shallow(<Field name="name" {...props} />)
  const wrapMount = (props = {}) => mount(<Field name="name" {...props} />)

  it('renders input props when passed in (Показывает корректно props.id которые мы в него прокидываем)', () => {
    const wrapper = wrap({ id: 'foo' })
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
  })

  it('renders name (При генерации у элемента есть аттрибут name)', () => {
    const wrapper = wrap()
    expect(wrapper.find({ name: 'name' })).toHaveLength(1)
  })

  it('does not render error when passed in without invalid', () => {
    const wrapper = wrap({ error: 'foo error' })
    expect(wrapper.contains('foo error')).toBe(false)
  })

  it('renders error when passed in along with invalid', () => {
    const wrapper = wrap({ error: 'foo error', invalid: true })
    expect(wrapper.contains('foo error')).toBe(true)
  })
})
