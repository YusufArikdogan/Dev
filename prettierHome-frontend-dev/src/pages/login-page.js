import React from 'react'
import PageHeader from '../components/common/page-header'
import Spacer from '../components/common/spacer'
import LoginForm from '../components/login-reqister/login-form'

const LoginPage = () => {
  return (
    <>
        <PageHeader title="LOGIN"/>
        <Spacer minHeight={50}/>
        <LoginForm/>
        <Spacer/>
    </>
  )
}

export default LoginPage