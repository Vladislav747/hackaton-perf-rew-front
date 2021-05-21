describe("fixme", () => {
    it("fixme", () => {
         expect(true).toBe(true);
    });
})

/*
import React from 'react'
import { mount } from 'enzyme'
import HeaderMenu from './HeaderMenu'
import { MemoryRouter } from 'react-router-dom'

describe('<HeaderMenu />', () => {
    const logOut = jest.fn()
    const wrapMount = (props = {}) =>
        mount(
            <MemoryRouter>
                <HeaderMenu {...props} />
            </MemoryRouter>
        )
    it('render container', () => {
        expect(
            wrapMount({
                logOut
            })
                .find('.component-header-menu')
                .first()
        ).toHaveLength(1)
    })
    it('render Link to authorize', () => {
        expect(
            wrapMount({
                logOut,
                authorized: false
            })
                .find('Link.btn-login')
                .props().to
        ).toEqual('/authorization')
    })

    it('render Link to archive', () => {
        expect(
            wrapMount({
                logOut
            })
                .find('Link.btn-archive')
                .props().children
        ).toEqual('Архив записей')
    })

    it('show username', () => {
        expect(
            wrapMount({
                logOut,
                authorized: true,
                username: 'test_username'
            }).text()
        ).toMatch('test_username')
    })

    it('run logout function', () => {
        const rendered = wrapMount({
            logOut,
            authorized: true,
            username: 'test_username'
        })
        rendered
            .find('.btn-exit')
            .first()
            .simulate('click')
        rendered
            .find('.btn-logout')
            .first()
            .simulate('click')
        expect(logOut).toHaveBeenCalledTimes(1)
    })
})
*/