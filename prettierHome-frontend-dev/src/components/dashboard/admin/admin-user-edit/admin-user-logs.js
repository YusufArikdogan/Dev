import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { ConfirmPopup } from "primereact/confirmpopup";
import {  getLogs } from "../../../../api/log-service";
import "./admin-user-logs.scss";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminUserLogs= () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const { listRefreshToken,currentRecord } = useSelector((state) => state.misc);
  const toast = useRef(null);
 const id=currentRecord?.id;
 console.log(id);
 const navigate = useNavigate();

  const showError = (errMsg) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail:`${errMsg}`,
      life: 3000,
    });
  };
  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  
  
  

  const loadData = async (page) => {
    
    try {
      const resp = await getLogs(id,page,lazyState.rows);
      console.log(resp);
      setLogs(resp.content);
      console.log(resp.content);
      // console.log(tourRequest)
      setTotalRows(resp.totalElements);
      
    } catch (err) {
      const errMsg = Object.values(err?.response?.data)[1]?.message
       console.log(errMsg);
      showError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const onPage = (event) => {
    setlazyState(event);
  };
 

  
  useEffect(() => {
    if( currentRecord!==null){
      loadData(lazyState.page);
    }
    
   
  }, [ lazyState, listRefreshToken]);

  return (
    <>
    
      <Toast ref={toast} />
      <ConfirmPopup />
      <Container className="user-log-container">
        <div className="user-log-datatable-wrapper">
          <div className="user-log-card">
            <DataTable
              className="user-log-datatable"
              lazy
              dataKey="id"
              value={logs} // the data to display in the table
              paginator // show pagination bar
              rows={lazyState.rows} // how many rows to display in each page
              rowsPerPageOptions={[5, 10, 15, 20]}
              totalRecords={totalRows}
              loading={loading}
              first={lazyState.first}
              onPage={onPage}
              paginatorTemplate={
                "PrevPageLink PageLinks CurrentPageReport NextPageLink"
              }
             
            >
              <Column header="Action" field="message" ></Column>
              <Column header="Date" field="createdAt" ></Column>
            </DataTable>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminUserLogs;
