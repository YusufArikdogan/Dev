import React from 'react';
import AdminUserDeleteAndSave from '../../../components/dashboard/admin/admin-user-edit/admin-user-delete-save';
import Spacer from '../../../components/common/spacer';
import { Fieldset } from 'primereact/fieldset';
import AdminUserAdvertsProperty from '../../../components/dashboard/admin/admin-user-edit/admin-user-adverts-property';
import AdminUserTourRequestProperty from '../../../components/dashboard/admin/admin-user-edit/admin-user-tour-request-property';
import AdminUserFavoritesProperty from '../../../components/dashboard/admin/admin-user-edit/admin-user-favorites-property';
import "../../../components/dashboard/admin/admin-user-edit/field-set.scss"
import AdminUserLogs from '../../../components/dashboard/admin/admin-user-edit/admin-user-logs';
const AdminUserEditPage = () => {
  return (
    <>
    <AdminUserDeleteAndSave/>
    <Spacer minHeight={50}/>
    <Fieldset  legend="Adverts" toggleable>
    <AdminUserAdvertsProperty/>
</Fieldset>
<Spacer minHeight={50}/>
<Fieldset legend="Tour Request" toggleable>
    <p className="m-3">
    <AdminUserTourRequestProperty/>
    </p>
</Fieldset>
<Spacer minHeight={50}/>
<Fieldset legend="Favorites" toggleable>
    <AdminUserFavoritesProperty/>
</Fieldset>
<Spacer minHeight={50}/>
<Fieldset legend="Logs" toggleable>
    <AdminUserLogs/>
</Fieldset>
<Spacer minHeight={50}/>
  
    </>
  )
}

export default AdminUserEditPage