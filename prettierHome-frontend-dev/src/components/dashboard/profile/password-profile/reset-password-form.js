import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import * as Yup from "yup";
import PasswordInput from '../../../common/password-input';
import {resetPassword } from '../../../../api/auth-service';
import { swalAlert } from '../../../../helpers/function/swal';
import ButtonLoader from '../../../common/button-loader';
import { useNavigate } from 'react-router-dom';
import {isValid, isInValid} from "../../../../helpers/function/forms";
import "../../../login-reqister/login-form.scss"
import { IoMdMailUnread } from "react-icons/io";
import { MdLockReset } from "react-icons/md";

const ResetPasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const initialValues ={
       password: "",
       code: "",
    }

    const validationSchema = Yup.object({
        code:Yup.string().required("Code is required"),
        password: Yup.string()
        .required("New password is required")
        .min(8, "At least 8 characters")
        .max(30, "Max 30 characters")
        .matches(/[a-z]+/g, "One lowercase char")
        .matches(/[A-Z]+/g, "One uppercase char")
        .matches(/[\d+]+/g, "One number")
        .matches(/[!@#$%^&*()_+\-={};':"|,.<>?]+/, "One special character"),
        retryNewPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match")
    });

    const onSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
           await resetPassword(values)
          resetForm();
          navigate("/login");

        } catch (err) {
            console.log(err)
            const errMsg = Object.values(err.response.data)[0];
            swalAlert(errMsg, "error");
            } finally {
          setLoading(false);
        }
      };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

  return (
    <Container>
        <Row className="justify-content-center">
            <Col md={8} lg={6}>
                <Card className="login-card border-0">
                    <Card.Body>

                        <Form className="login-form" noValidate onSubmit={formik.handleSubmit}>
                            <InputGroup className="mb-4" controlId="code">
                                <InputGroup.Text id="basic-addon1"><IoMdMailUnread className='fs-5'/></InputGroup.Text>
                                <Form.Control
                                    className="user-input"
                                    type="text"
                                    placeholder="Code"

                                    {...formik.getFieldProps("code")}
                                    isInvalid={isInValid(formik, "code")}
                                    isValid={isValid(formik, "code")}                                      
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.code}
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2" controlId="password">
                                <PasswordInput 
                                    {...formik.getFieldProps("password")}
                                    isInvalid={isInValid(formik, "password")}
                                    isValid={isValid(formik, "password")}
                                    error={formik.errors.password}
                                />
                            </InputGroup>

                            <InputGroup className="mb-2" controlId="retryNewPassword">
                                <PasswordInput 
                                placeholderText="Confirm Password"
                                    {...formik.getFieldProps("retryNewPassword")}
                                    isInvalid={isInValid(formik, "retryNewPassword")}
                                    isValid={isValid(formik, "retryNewPassword")}
                                    error={formik.errors.retryNewPassword}
                                />
                            </InputGroup>

                            <div className='login-button'>
                                <Button variant="primary" type="submit" className="w-75 fs-5" disabled={!(formik.isValid) || loading}>
                                    {loading ? <ButtonLoader/>  : <MdLockReset className='fs-2' />} RESET PASSWORD
                                </Button>
                            </div>          
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default ResetPasswordForm