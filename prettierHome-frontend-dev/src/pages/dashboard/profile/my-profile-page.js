import React from 'react'
import PageHeader from '../../../components/common/page-header';
import ProfileForm from '../../../components/dashboard/profile/password-profile/profile-form';
import Spacer from '../../../components/common/spacer';

const MyProfilePage = () => {
 
    return (
      <>
        <PageHeader title="MY PROFILE" />
        <Spacer minHeight={50} />
        <ProfileForm />
        <Spacer />
      </>
   );
  
}

export default MyProfilePage;