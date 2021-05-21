import React from 'react'
import { mount } from 'enzyme'
import Logo from './Logo'

describe('<Logo Component />', () => {
  const wrapMount = (props = {}) => mount(<Logo {...props} />)
  it('render svg', () => {
    expect(wrapMount().find('svg')).toHaveLength(1)
  })
})
