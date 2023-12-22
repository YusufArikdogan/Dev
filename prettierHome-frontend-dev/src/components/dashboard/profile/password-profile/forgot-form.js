import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row, InputGroup} from "react-bootstrap";
import * as Yup from "yup";
import { swalAlert } from "../../../../helpers/function/swal";
import ButtonLoader from "../../../common/button-loader";
import { useNavigate } from "react-router-dom";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { forgotPassword } from "../../../../api/auth-service";
import "../../../login-reqister/login-form.scss"
import { MdEmail } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";


const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await forgotPassword(values);
      navigate("/reset-password");
    } catch (err) {
      console.log(err);
      const errMsg = Object.values(err.response.data)[0];
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
                 <InputGroup className="mb-4" controlId="email">
                      <InputGroup.Text id="basic-addon1"><MdEmail className='fs-5'/></InputGroup.Text>
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

                <div className="login-button">
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-75 fs-5"
                    disabled={!formik.isValid || loading}
                  >
                    {loading ? <ButtonLoader /> : <BsFillSendFill />} SEND RESET
                    CODE
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

export default LoginForm;
