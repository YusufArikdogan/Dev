import{React, useRef, useState } from "react";
import {  Col, Container, Form, Row } from "react-bootstrap";
import { Toast } from "primereact/toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import "../reports/admin-adverts-report.scss";
import { TfiPrinter } from "react-icons/tfi";
import { getUsers } from "../../../../api/report-service";
import { config } from "../../../../helpers/config";


const AdminUsersReport = () => {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);



  const initialValues = {
    role:"" ,
  };

  const validationSchema = Yup.object({
    role: Yup.string().required("Role is required"),
  });

  const loadData = async (role) => {
    console.log(role)
    setLoading(true);
    try {
      const resp = await getUsers(role);
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
  };
  const handleIconClick = () => {
    
   const  role= formik.values.role;
    loadData(role);
  };


  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    
   
  });


  return (
    <Container className="admin-report-container">
      <Toast ref={toast} />
     
      <Row className="admin-report-form-row">
      <Col xs={12} sm={10} md={10} lg={11} className="admin-report-form-col">
      <Form className="admin-report-form" noValidate >
        <Row className="admin-report-title-row"><span className="admin-report-title">Users</span></Row>
    <Row className="admin-report-form-row">
    <Form.Group className="form-group" controlId="role">
            <Form.Select
              className="form-group"
              {...formik.getFieldProps("role")}
              isInvalid={isInValid(formik, "role")}
              isValid={isValid(formik, "role")}
            >
              {config?.selectRoles.roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          
          </Row>
      </Form>
      </Col>
      <Col xs={12} sm={2} md={2} lg={1} className="admin-report-form-icon-col"><TfiPrinter onClick={handleIconClick} /></Col>
      </Row>
    </Container>
  );
};

export default AdminUsersReport;
