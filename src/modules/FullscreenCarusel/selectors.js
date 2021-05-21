import { moduleName } from './module'
import { createSelector } from 'reselect'

/**
 * селекторы
 */
export const initState = state => state[moduleName]

export const caruselStateSelector = createSelector(
    [initState],
    state => state.carusel
)
