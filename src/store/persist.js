import {
  moduleName as userModuleName,
  StateSchema as userSchema,
} from '../modules/user'

import get from 'lodash/get'
import set from 'lodash/set'
import sendErrorToSentry from '../helpers/sentry'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('persistState')
    if (serializedState === null) {
      return undefined
    }
    let state = {}
    const stateParsed = JSON.parse(serializedState)
    Object.keys(persistConfig).forEach(key => {
      const config = persistConfig[key]
      set(state, key, mergeDefaults(config, stateParsed))
    })
    return state
  } catch (e) {
    sendErrorToSentry(`Error with persist ${e}`, {
      place: '/src/store/persist.js',
    })
  }
  return undefined
}

export const saveState = state => {
  try {
    let dataForSave = {}
    Object.keys(persistConfig).forEach(key => {
      const config = persistConfig[key]
      const savePathList = getSavePathList(config)
      if (savePathList.length > 0 && state[key]) {
        savePathList.forEach(path => {
          const data = get(state[key], path, undefined)
          if (data !== undefined) {
            set(dataForSave, `${key}.${path}`, data)
          }
        })
      }
    })
    localStorage.setItem('persistState', JSON.stringify(dataForSave))
  } catch (e) {
    sendErrorToSentry(`Error with persist ${e}`, {
      place: '/src/store/persist.js',
    })
  }
}

const mergeDefaults = (part, data = {}) => {
  const { schema, key, saveList } = part
  if (!schema) {
    return data[key]
  }
  if (saveList && Array.isArray(saveList)) {
    let result = { ...schema }
    saveList.forEach(innerPart => {
      if (data[key]) {
        result[innerPart.key] = mergeDefaults(innerPart, data[key])
      }
    })
    return result
  }
  return {}
}

const getSavePathList = (config = {}) => {
  const { saveList } = config
  let result = []
  if (saveList) {
    saveList.forEach((item = {}) => {
      const { key: itemKey, saveList: itemList } = item
      if (!itemList) {
        result.push(itemKey)
      }
      getSavePathList(item).forEach(inner => {
        result.push(`${itemKey}.${inner}`)
      })
    })
  }
  return result
}

export const persistConfig = {
  // [userModuleName]: {
  //     key: userModuleName,
  //     schema: userSchema,
  //     saveList: [{ key: 'username' }]
  // }
}
