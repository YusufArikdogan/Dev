import React from 'react'
import PageHeader from '../../../components/common/page-header';
import Spacer from '../../../components/common/spacer';
import AdminCategoryList from '../../../components/dashboard/admin/categories/admin-category-list';

const AdminCategoryListPage = () => {
  return (
    <>
    <Spacer minHeight={25} />
    <AdminCategoryList/>
  </>
  )
}

export default AdminCategoryListPage