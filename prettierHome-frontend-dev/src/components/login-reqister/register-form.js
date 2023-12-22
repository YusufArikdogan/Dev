import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import * as Yup from "yup";
import PasswordInput from '../common/password-input';
import { swalAlert } from '../../helpers/function/swal';
import ButtonLoader from '../common/button-loader';
import { Link, useNavigate } from 'react-router-dom';
import {isValid, isInValid} from "../../helpers/function/forms";
import { register } from '../../api/auth-service';
import ReactInputMask from 'react-input-mask-next';
import "./login-form.scss";
import { FaUserLarge } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { AiOutlineForm } from "react-icons/ai";


const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const initialValues ={
        firstName:"",
        lastName:"",
        phone:"",
        password: "",
        email: "",
        confirmPassword: ""

    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required").min(1, "At least 1 characters").max(50, "Max 50 characters"),
        lastName: Yup.string().required("Last name is required").min(1, "At least 1 characters").max(50, "Max 50 characters"),
        phone: Yup.string()
        .required("Phone is required")
        .matches(/\(\d{3}\) \d{3}-\d{4}/g, "Invalid phone number"),
        password:Yup.string()
        .required("Password is required")
        .min(8, "At least 8 characters")
        .max(30, "Max 30 characters")
        .matches(/[a-z]+/g, "One lowercase char")
        .matches(/[A-Z]+/g, "One uppercase char")
        .matches(/[\d+]+/g, "One number")
        .matches(/[!@#$%^&*()_+\-={};':"|,.<>?]+/, "One special character"),
        email:Yup.string().email("Invalid email").max(50, "Max 50 characters").required("Email is required"),
        confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),

    });

    const onSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
          const resp = await register(values);
          console.log(resp)
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

                            <InputGroup className="mb-4" controlId="firstName">
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

                            <InputGroup className="mb-4" controlId="lastName">
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

                            <InputGroup className="mb-4" controlId="phone">
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

                            <InputGroup className="mb-4" controlId="email">
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

                            <Form.Group className="mb-2" controlId="password">
                                
                                <PasswordInput 
                                    {...formik.getFieldProps("password")}
                                    isInvalid={isInValid(formik, "password")}
                                    isValid={isValid(formik, "password")}
                                    error={formik.errors.password}
                                />
                            </Form.Group>
                            <Form.Group className="" controlId="confirmPassword">
                                
                                <PasswordInput 
                                placeholderText="Confirm Password"
                                    {...formik.getFieldProps("confirmPassword")}
                                    isInvalid={isInValid(formik, "confirmPassword")}
                                    isValid={isValid(formik, "confirmPassword")}
                                    error={formik.errors.confirmPassword}
                                />
                            </Form.Group>

                            <div className='login-button'>
                                <Button variant="primary" type="submit" className="w-75 fs-5" disabled={!(formik.isValid) || loading}>
                                    {loading ? <ButtonLoader/>  : <AiOutlineForm className='fs-4' />} REGISTER
                                </Button>
                            </div>

                            <div className='register text-muted'>
                                <div>If you already have an account.</div>
                                <div><Link to="/login">Login now!</Link></div>
                            </div>                        
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default RegisterForm