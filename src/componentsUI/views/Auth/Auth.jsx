import React from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import localStorageKeys from '../../../helpers/storage/localStorageKeys'
import LocalStorage from '../../../helpers/storage/LocalStorage'

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }
  componentWillMount = () => {
    const {
      authByCode,
      authorized,
      authComplete,
      authError,
      location,
    } = this.props
    const params = new URLSearchParams(location.search)
    const code = params.get('code')
    const state = params.get('state')
    const { routerState } = location;

    const authUID = LocalStorage.get(localStorageKeys.UID)
    if (state !== authUID) {
      authError('state not equal authUID')
      return
    }
    if (!authorized && !authComplete) {
      authByCode(code)
      return
    }
    authError('Неизвестная ошибка')
  }
  render() {
    const { authComplete } = this.props
    
    /*if (authComplete) {
      const redirectPath = routerState.from || '/'
      return <Redirect to={'/'} />
    }*/
    return <div>Авторизация...</div>
  }
}

Auth.propTypes = {
  authorized: PropTypes.bool.isRequired,
  authComplete: PropTypes.bool.isRequired,
  authByCode: PropTypes.func.isRequired,
  authError: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

export default Auth
