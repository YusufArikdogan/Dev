import React from 'react'
import PageHeader from '../components/common/page-header'
import Spacer from '../components/common/spacer'
import RegisterForm from '../components/login-reqister/register-form'


const RegisterPage = () => {
  return (
    <>
    <PageHeader title="REGISTER"/>
    <Spacer minHeight={50}/>
    <RegisterForm/>
    <Spacer/>
</>
  )
}

export default RegisterPage