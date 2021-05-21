import React from 'react'
import { Redirect } from 'react-router-dom'
import { getAccessToken } from '../../../helpers/authTokens'

const  ProtectedRoute = (props: any) => {

     const Component = props.component;
     const token = getAccessToken()
       
     return token ? (
           <Component {...props.computedMatch.params}/>
          ) : (
            <Redirect 
               to={{ 
                    pathname: '/authorization',
                    state: { from: props.location }
               }}
               
          />
     )
}

export default ProtectedRoute;