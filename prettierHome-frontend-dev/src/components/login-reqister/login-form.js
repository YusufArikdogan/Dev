import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import PasswordInput from "../common/password-input";
import { login } from "../../api/auth-service";
import { swalAlert } from "../../helpers/function/swal";
import { AiFillLock } from "react-icons/ai";
import ButtonLoader from "../common/button-loader";
import { Link, useNavigate } from "react-router-dom";
import { isValid, isInValid } from "../../helpers/function/forms";
import { useDispatch } from "react-redux";
import { login as loginSuccess } from "../../store/slices/auth-slice";
import { setToLocalStorage } from "../../helpers/function/encrypted-storage";
import "./login-form.scss";
import { FaUserLarge } from "react-icons/fa6";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    password: "admin123!",
    email: "admin@gmail.com",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    email: Yup.string().required("Email is required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const resp = await login(values);
      console.log(resp);
      const { token } = resp;
      console.log(token);
      setToLocalStorage("token", token);
      dispatch(loginSuccess(resp));
      navigate("/");
      
        // todo burasi tartisilacak, yapilmali mi? yapilmamali mi?
    //   if (resp.role === "ADMIN" || resp.role === "MANAGER") {
    //     navigate("/dashboard");
    //   } else {
    //     navigate("/");
    //   }
      
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data.message;
      console.log(errMsg);
      swalAlert(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
    
    return(
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
                    <InputGroup className="mb-4" controlId="email">
                      <InputGroup.Text id="basic-addon1">
                        <FaUserLarge />
                      </InputGroup.Text>
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
                    <InputGroup className="mb-3" controlId="password">
                      <PasswordInput
                        {...formik.getFieldProps("password")}
                        isInvalid={isInValid(formik, "password")}
                        isValid={isValid(formik, "password")}
                        error={formik.errors.password}
                      />
                    </InputGroup>
                    <div className="forget-password text-muted">
                      <Link to="/forgot-password">Forget Password?</Link>
                    </div>
                    <div className="login-button">
                      <Button
                        variant="primary"
                        type="submit"
                        className="w-75"
                        disabled={!formik.isValid || loading}
                      >
                        {loading ? <ButtonLoader /> : <AiFillLock />} LOGIN
                      </Button>
                    </div>
                    <div className="register text-muted">
                      <div>If you don't have an account.</div>
                      <div>
                        <Link to="/register">Register now!</Link>
                      </div>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    );
};

export default LoginForm;
