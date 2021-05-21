import { moduleName } from './module'
import { createSelector } from 'reselect'

export const initState = state => state[moduleName]

export const selectPlayStateIds = createSelector(
    [initState],
    state => state.playStateIds
)

export const selectHdAllStatus = createSelector(
    [initState],
    state => state.hdAllStatus
)
