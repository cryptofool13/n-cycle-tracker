import React from 'react'

const AuthBtn = ({authType}) => {
  const submitCredentials = () => {
    // fetch request to auth server
  }
  return (
    <button onClick={submitCredentials}>
      {authType === 'login' && 'Login'}
      {authType === 'newAct' && 'Create Account'}
    </button>
  )
}

export default AuthBtn