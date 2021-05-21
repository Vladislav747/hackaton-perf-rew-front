import LocalStorage from '../storage/LocalStorage'
import localStorageKeys from '../storage/localStorageKeys'
import sendErrorToSentry from '../sentry/index'

export const getLoginFromLs = () => {
  const loginLs = localStorage.getItem(localStorageKeys.USER_LOGIN)
  if (loginLs) {
    try {
      return JSON.parse(loginLs)
    } catch (e) {
      sendErrorToSentry(`Error getting LS UserLogin ${e}`)
    }
    return null
  } else return ''
}

export const setLoginToLs = async login => {
  return LocalStorage.set(localStorageKeys.USER_LOGIN, login)
}
