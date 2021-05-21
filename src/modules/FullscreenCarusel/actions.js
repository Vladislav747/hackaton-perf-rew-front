import { moduleName } from './module'

const appName = process.env.REACT_APP_NAME

export const actionTypes = {
    STOP: `${appName}/${moduleName}/STOP`,
    RUN: `${appName}/${moduleName}/RUN`,
}

export const runCarusel = () => {
    return {
        type: actionTypes.RUN
    }
}

export const stopCarusel = () => {
    return {
        type: actionTypes.STOP
    }
}