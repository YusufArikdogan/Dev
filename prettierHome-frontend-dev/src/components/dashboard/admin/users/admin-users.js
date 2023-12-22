import { LiaSearchSolid } from "react-icons/lia";
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import {
  setCurrentRecord,
  setListRefreshToken,
} from "../../../../store/slices/misc-slice";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ConfirmPopup } from "primereact/confirmpopup";
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import { PiHandPalmDuotone } from "react-icons/pi";
import { deleteUser, getUsers } from "../../../../api/user-service";
import "../users/admin-users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const { listRefreshToken } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
  console.log(users);
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

  const getOperationButtons = (row) => {
    if (row.built_in) return null;
    return (
      <div className="operationsButton">
        <Button
          className="btn-link"
          onClick={(e) => {
            userDecline(e, row);
          }}
        >
          <FiTrash />
        </Button>
        <Button
          className="btn-link"
          onClick={(e) => {
            handleEdit(row);
          }}
        >
          <LuPencil />
        </Button>
      </div>
    );
  };

  const userDecline = (event, row) => {
    prettyConfirm({
      event: event,
      message: "Are you sure you want to delete the user?",
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDelete(row.id),
      handleReject: () => {
        reject();
      },
    });
  };
  const handleChange = () => {
    if (inputRef.current.value.length === 0) {
      setSearchText("");
    }
    console.log(inputRef.current.value)
      setSearchText(inputRef.current.value);

  };

  const loadData = async (page) => {
    console.log(searchText);
    try {
      const resp = await getUsers(searchText, page, lazyState.rows);
      console.log(resp);
      setUsers(resp.content);
     
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

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.current.show({
        severity: "Success",
        summary: "Declined",
        detail: "User declined",
        life: 3000,
        icon: <PiHandPalmDuotone size={50} />,
      });
      dispatch(setListRefreshToken(Math.random()));
    } catch (error) {
      console.log(error); // TODO
      showError("User deletion failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    dispatch(setCurrentRecord(row));
    // console.log(row);
    navigate("admin-user-edit");
  };

  const onPage = (event) => {
    if (event.page === lazyState.page) return;
    setlazyState(event);
  };
  const getFullName = (user) => {
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
  };

  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  };
  const fullName = (user) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title ">Name</span>
      {getFullName(user)}
    </div>
  );

  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Action</span>
      {getOperationButtons(row)}
    </div>
  );
  const inputRef = useRef(null);


  useEffect(() => {
    
    loadData(lazyState.page);
  }, [searchText, lazyState, listRefreshToken]);

  return (
    <>
     
      

      <Toast ref={toast} />
      <ConfirmPopup />
      <Container className="user-container">
      <div className="search-div bottom-side d-flex  gap-2  mb-5 rounded-3">
        <input
          className="form-control mr-sm-2 border-0 rounded-3"
          value={searchText}
          type="search"
          ref={inputRef}
          placeholder="Search"
          aria-label="Search"
          onChange={() => handleChange()}
        ></input>
        <button className="btn btn-primary  rounded-3">
          <LiaSearchSolid size={25} color="white" />
        </button>
      </div>

        <div className="user-datatable-wrapper">
          <div className="user-card">
            <DataTable
              className="user-datatable"
              lazy
              dataKey="id"
              value={users} // the data to display in the table
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
              <Column className="user-column" header="Name" body={fullName}></Column>
              <Column field = "email" header="Email"></Column>
              <Column field = "phone" header="Phone"></Column>
              <Column header="Action" body={operationButton}></Column>
            </DataTable>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Users;
