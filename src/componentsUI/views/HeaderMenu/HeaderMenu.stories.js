import React from 'react'
import HeaderMenu from './HeaderMenu'
import { action } from '@storybook/addon-actions'

export default { title: 'HeaderMenu', component: HeaderMenu }

export const DefaultHeaderMenu = () => <HeaderMenu logOut={action('logout')} />
export const AuthorizedHeaderMenu = () => (
    <HeaderMenu
        authorized={true}
        username="username"
        logOut={action('logout')}
    />
)
