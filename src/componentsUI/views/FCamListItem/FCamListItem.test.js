import React from 'react'
import { shallow, mount } from 'enzyme'
import FCamListItem from './FCamListItem'

describe('<FCamListItem Component />', () => {
  const wrap = (props = {}) => shallow(<FCamListItem {...props} />)
  const wrapMount = (props = {}) => mount(<FCamListItem {...props} />)

  it("Check that FCamListItem has container (div with class 'cam-list-item') ", () => {
    expect(wrap().find('.cam-list-item')).toHaveLength(1)
  })
})
