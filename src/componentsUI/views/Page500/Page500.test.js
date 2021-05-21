import React from 'react'
import { shallow } from 'enzyme'
import Page500 from './Page500'

describe('<Page500 />', () => {
    const wrapper = shallow(<Page500 />)
    it('container', () => {
        expect(wrapper.is('.component-page500')).toEqual(true)
    })
    it('header', () => {
        const wrapper = shallow(<Page500 />)
        const header = <h4 className="pt-3">Хьюстон, у нас проблема!</h4>
        expect(wrapper.contains(header)).toEqual(true)
    })
})
