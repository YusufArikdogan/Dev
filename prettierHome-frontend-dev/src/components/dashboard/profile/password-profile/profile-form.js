import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import { swalAlert, swalConfirm } from "../../../../helpers/function/swal";
import ButtonLoader from "../../../common/button-loader";
import { Link, useNavigate } from "react-router-dom";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import ReactInputMask from "react-input-mask-next";
import { deleteUser, updateUser } from "../../../../api/auth-service";
import { setListRefreshToken, setOperation } from "../../../../store/slices/misc-slice";
import { useDispatch, useSelector} from "react-redux";
import "../../../login-reqister/login-form.scss"
import { FaUserLarge } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdUpdate } from "react-icons/md";
import {login as loginSuccess} from "../../../../store/slices/auth-slice";

const ProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const { user} = useSelector(state => state.auth);
  
  const initialValues = {
    ...user
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
      email:Yup.string().email("Invalid email").max(50, "Max 50 characters").required("Email is required")
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const resp = await updateUser(values);
      console.log(resp)
      dispatch(loginSuccess(resp));
      dispatch(setOperation(null));
      dispatch(setListRefreshToken(Math.random()));
     
      swalAlert("Profile updated", "success");
      navigate("/");
    } catch (err) {
        console.log(err)
        const errMsg = err.message;
        swalAlert(errMsg, "error");
        } finally {
      setLoading(false);
     
    }
  };
  const handleDelete = async() => {
    const resp = await swalConfirm("Are you sure to delete?")  ;
    if(!resp.isConfirmed) return;
    setLoading(true);
    try {
     const resp= await deleteUser();
     console.log(resp)
      dispatch(setListRefreshToken(Math.random()))
      swalAlert("User was deleted", "success");
      navigate("/");
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.message;
        swalAlert(errMsg, "error");
    }
    finally{
      setLoading(false);
    }
  }


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true
  });
  

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="login-card border-0">
            <Card.Body>
              <Form
                className="login-form"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <InputGroup className="mb-4">
                                <InputGroup.Text id="basic-addon1"><FaUserLarge /></InputGroup.Text>
                                <Form.Control
                                    className="user-input"
                                    type="text"
                                    placeholder="First Name"

                                    {...formik.getFieldProps("firstName")}
                                    isInvalid={isInValid(formik, "firstName")}
                                    isValid={isValid(formik, "firstName")}                                      
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.firstName}
                                </Form.Control.Feedback>
                            </InputGroup>

                            <InputGroup className="mb-4" >
                                <InputGroup.Text id="basic-addon1"><FaUserLarge /></InputGroup.Text>
                                <Form.Control
                                    className="user-input"
                                    type="text"
                                    placeholder="Last Name"

                                    {...formik.getFieldProps("lastName")}
                                    isInvalid={isInValid(formik, "lastName")}
                                    isValid={isValid(formik, "lastName")}                                      
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.lastName}
                                </Form.Control.Feedback>
                            </InputGroup>

                            <InputGroup className="mb-4" >
                                <InputGroup.Text id="basic-addon1"><FaPhoneAlt/></InputGroup.Text>
                                <Form.Control
                                    className="user-input"
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

                            <InputGroup className="mb-4" >
                                <InputGroup.Text id="basic-addon1"><IoMdMail /></InputGroup.Text>
                                <Form.Control
                                    className="user-input"
                                    type="text"
                                    placeholder="Email"

                                    {...formik.getFieldProps("email")}
                                    isInvalid={isInValid(formik, "email")}
                                    isValid={isValid(formik, "email")}                                      
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.email}
                                </Form.Control.Feedback>
                            </InputGroup>
                            <div className='forget-password text-muted'>
                            <Link to="/change-password">Change Password?</Link>
                            </div>
                <div className="login-button mb-5">
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-75 fs-5"
                    disabled={!formik.isValid || loading}
                  >
                    {loading ? <ButtonLoader /> : <MdUpdate className="fs-3" />} UPDATE
                  </Button>
                </div>

                <div>
                    <Button style={{borderRadius:"5px"}} onClick={handleDelete}>
                        If you want to delete your account <u>click here!</u> If you delete your account, all related records with this account will also 
                        be deleted permanently
                    </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileForm;
