import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import "../../profile/advert-edit-new/advert-common.scss";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { swalAlert } from "../../../common/swal";
import { useFormik } from "formik";
import {
  deleteUser,
  updateOneUser,
} from "../../../../api/user-service";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import ReactInputMask from "react-input-mask-next";
import { AiFillLock } from "react-icons/ai";
import ButtonLoader from "../../../common/button-loader";
import "../../admin/admin-user-edit/admin-user-delete-save.scss";
import {config} from "../../../../helpers/config";
import { setListRefreshToken } from "../../../../store/slices/misc-slice";
import { MdDelete } from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";

const AdminUserDeleteAndSave = () => {
  const { currentRecord } = useSelector((state) => state.misc);
  const id = currentRecord?.id;
  console.log(currentRecord);
  console.log(id);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {listRefreshToken } = useSelector(state => state.misc);
  const initialValues = {
   ...currentRecord
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(1, "At least 1 characters")
      .max(50, "Max 50 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(1, "At least 1 characters")
      .max(50, "Max 50 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/\(\d{3}\) \d{3}-\d{4}/g, "Invalid phone number"),
    email: Yup.string()
      .email("Invalid email")
      .max(50, "Max 50 characters")
      .required("Email is required"),
    role: Yup.string().required("Role is required"),
  });

  

  const onReset = async () => {
    try {
      const data = await deleteUser(id);
      console.log(data);
      formik.resetForm();
      navigate("dashboard/users");
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
     
      toast.current.show({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };

  const onSubmit = async (values) => {
    console.log(values)
    setLoading(true);

    try {
      const resp = await updateOneUser(id,values);
      console.log(resp);
      swalAlert("Advert created successfully", "success");
      navigate("/dashboard/users");
      dispatch(setListRefreshToken(Math.random()));
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    onReset,
    enableReinitialize: true,
  });

  useEffect(() => {
    if(currentRecord===null) navigate("/dashboard/users");
  }, [listRefreshToken]);

  return (
    <Container className="admin-user-edit-container">
      <Toast ref={toast} />
      <Form className="admin-user-edit-form" noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Row>
          <div className="admin-user-edit-input-group-first-row  mb-6">
        <Form.Label className="">First name</Form.Label>
        <InputGroup  controlId="firstName">
          <Form.Control
            className="admin-user-edit-input"
            type="text"
            {...formik.getFieldProps("firstName")}
            isInvalid={isInValid(formik, "firstName")}
            isValid={isValid(formik, "firstName")}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.firstName}
          </Form.Control.Feedback>
        </InputGroup>
        </div>
        <div className="admin-user-edit-input-group-first-row  mb-6">
        <Form.Label className="">Last name</Form.Label>
        <InputGroup controlId="lastName">
          <Form.Control
            className="admin-user-edit-input"
            type="text"
            {...formik.getFieldProps("lastName")}
            isInvalid={isInValid(formik, "lastName")}
            isValid={isValid(formik, "lastName")}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.lastName}
          </Form.Control.Feedback>
        </InputGroup>
        </div>
        </Row>
        <Row>
          <div className="admin-user-edit-input-group mb-6">
        <Form.Label>Phone</Form.Label>
        <InputGroup  controlId="phone">
          <Form.Control
            className="admin-user-edit-input"
            as={ReactInputMask}
            mask="(999) 999-9999"
            type="text"
            placeholder="Phone (XXX) XXX-XXXX"
         
            {...formik.getFieldProps("phone")}
            isValid={isValid(formik, "phone")}
            isInvalid={isInValid(formik, "phone")}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.phone}
          </Form.Control.Feedback>
        </InputGroup>
        </div>
        <div className="admin-user-edit-input-group mb-6">
        <Form.Label>Email</Form.Label>
        <InputGroup  controlId="email">
          <Form.Control
            className="admin-user-edit-input"
            type="text"
            {...formik.getFieldProps("email")}
            isInvalid={isInValid(formik, "email")}
            isValid={isValid(formik, "email")}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </InputGroup>
        </div>
        <div className="admin-user-edit-input-group mb-6">
        <Form.Label>Roles</Form.Label>
        <InputGroup  controlId="role">
        
        <Form.Select  className="admin-user-edit-input"
         {...formik.getFieldProps("role")}
         isInvalid={isInValid(formik, "role")}
         isValid={isValid(formik, "role")}>
        {config?.selectRoles.roles.map((role) => (
          <option key={role} value={role} >{role}</option>
        ))}
      </Form.Select>
      </InputGroup>
      </div>
        </Row>
       <Row className="admin-user-button-row">
        <Button
          variant="primary"
          type="reset"
          className="admin-user-button-delete"
          disabled={!formik.isValid || loading}
        >
          {loading ? <ButtonLoader /> :null} DELETE
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="admin-user-button-save"
          disabled={!formik.isValid || loading}
        >
          {loading ? <ButtonLoader /> : <MdSaveAlt />} SAVE
        </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default AdminUserDeleteAndSave;
