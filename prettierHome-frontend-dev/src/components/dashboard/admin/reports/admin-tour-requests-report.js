import React, { useRef, useState } from "react";
import {  Col, Container, Form, Row } from "react-bootstrap";
import { Toast } from "primereact/toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { config } from "../../../../helpers/config";

import "../reports/admin-adverts-report.scss";
import { TfiPrinter } from "react-icons/tfi";
import { getTourRequests } from "../../../../api/report-service";


const AdminTourRequestsReport = () => {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);



  const initialValues = {
    startDate:"" ,
    endDate: "",
    status: "",
  };

  const validationSchema = Yup.object({
    startDate: Yup.date().required("Tour date is required"),
    endDate: Yup.date().required("Tour date is required"),
    status: Yup.number().required("Status is required"),
  });


    
  const loadData = async (values) => {
    console.log(values)
    setLoading(true);
    try {
      const resp = await getTourRequests(values);
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
    const formData = {
      startDate: formik.values.startDate,
      endDate: formik.values.endDate,
      status: formik.values.status,
    };
    loadData(formData);
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
        <Row className="admin-report-title-row"><span className="admin-report-title">Tour Requests</span></Row>
    <Row className="admin-report-form-row">
          <Form.Group className="form-group" controlId="startDate">
            <Form.Control
              type="date"
              plaseholder=""
              {...formik.getFieldProps("startDate")}
              isInvalid={isInValid(formik, "startDate")}
              isValid={isValid(formik, "startDate")}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.startDate}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="form-group" controlId="endDate">
            <Form.Control
              type="date"
              plaseholder=""
              {...formik.getFieldProps("endDate")}
              isInvalid={isInValid(formik, "endDate")}
              isValid={isValid(formik, "endDate")}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.endDate}
            </Form.Control.Feedback>
          </Form.Group>
         
          <Form.Group className="form-group" controlId="status">
            <Form.Select
              className="form-group"
              {...formik.getFieldProps("status")}
              isInvalid={isInValid(formik, "status")}
              isValid={isValid(formik, "status")}
            >
              {config?.tourRequestStatus.status.map((status,index) => (
                <option key={status} value={index}>
                  {status}
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

export default AdminTourRequestsReport;
