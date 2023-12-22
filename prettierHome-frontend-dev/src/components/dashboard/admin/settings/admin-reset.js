import React, { useRef, useState } from "react";
import { Button,  Container,  Row } from "react-bootstrap";
import { Toast } from "primereact/toast";
import "./admin-reset.scss";
import { resetDatabase } from "../../../../api/settings-service";


const AdminReset = () => {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const resp = await resetDatabase();
      console.log(resp);
    } catch (err) {
      const errMsg = Object.values(err?.response?.data)[1]?.message;
      console.log(errMsg);
      toast.current.show({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    } finally {
      setLoading(false);
 

    }
  }

  return (
    <Container className="admin-reset-container">
      <Toast ref={toast} />
     
      <Row className="admin-reset-title-row"><h4 className="h4">Reset Database</h4> </Row>
      <Row className="admin-reset-description-row"><div className="span"> You are about to delete all records except those whose built-in fields are true. Are you sure to reset database?</div></Row>
      <Row className="admin-reset-button-row"><Button className="admin-reset-button" onclick={handleDelete}>Reset Database</Button> </Row>

    </Container>
  );
};

export default AdminReset
