import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import * as Yup from "yup";
import PasswordInput from '../../../common/password-input';
import {changePassword} from '../../../../api/auth-service';
import { swalAlert } from '../../../../helpers/function/swal';
import ButtonLoader from '../../../common/button-loader';
import {isValid, isInValid} from "../../../../helpers/function/forms";
import "../../../login-reqister/login-form.scss"
import { useDispatch } from "react-redux";
import {
  setListRefreshToken,
  setOperation,
} from "../../../../store/slices/misc-slice";
import { useNavigate } from 'react-router-dom';
import { MdUpdate } from "react-icons/md";


const ChangePasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const initialValues ={
       password: "",
       currentPassword: ""
    }

    const validationSchema = Yup.object({
        currentPassword: Yup.string().required('Old password is required'),
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
          const resp = await changePassword(values);
          console.log(resp)
          resetForm();
          dispatch(setOperation(null));
          dispatch(setListRefreshToken(Math.random()));
          navigate("/login");


        } catch (err) {
            console.log(err)
            const errMsg = err.message;
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
                            <InputGroup className="mb-2" controlId="currentPassword">
                                <PasswordInput 
                                placeholderText="Current Password"
                                    {...formik.getFieldProps("currentPassword")}
                                    isInvalid={isInValid(formik, "currentPassword")}
                                    isValid={isValid(formik, "currentPassword")}
                                    error={formik.errors.currentPassword}
                                />
                            </InputGroup>   
                            <InputGroup className="mb-2" controlId="password">
                                <PasswordInput 
                                placeholderText="New Password"
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
                                    {loading ? <ButtonLoader/>  : <MdUpdate className="fs-3" />} UPDATE
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

export default ChangePasswordForm