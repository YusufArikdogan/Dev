import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setListRefreshToken,
  setOperation,
} from "../../../../store/slices/misc-slice";
import { swalAlert } from "../../../../helpers/function/swal";
import { useFormik } from "formik";
import ButtonLoader from "../../../common/button-loader";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { formatTime } from "../../../../helpers/function/date-time";
import {
  tourRequestCancel,
  tourRequestUpdate,
} from "../../../../api/tour-requests-service";
import "../tour-request-detail/tour-request-update-form.scss";

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of ["00", "30"]) {
      const time = `${hour.toString().padStart(2, "0")}:${minute}`;
      options.push(time);
    }
  }
  return options;
};
const TourRequestUpdateForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentRecord } = useSelector((state) => state.misc);
  // console.log(currentRecord)
  const formattime=formatTime(currentRecord?.tourTime);

  console.log(formattime);
  const initialValues = {
    ...currentRecord,
    tourDate: currentRecord?.tourDate,
    tourTime: formatTime(currentRecord.tourTime),
    advertId: currentRecord?.advert.id,
  };

  const validationSchema = Yup.object({
    tourDate: Yup.date().required("Tour date is required"),
    tourTime: Yup.string().required("Tour time is required"),
  });

  const id = currentRecord.id;
  const handleCancel = async () => {
    try {
      const resp = await tourRequestCancel(id);
      console.log(resp);
      dispatch(setOperation("null"));
      dispatch(setListRefreshToken(Math.random()));
      swalAlert(" Tour request status set to canceled", "success");
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data.message && err.response.data;

      swalAlert(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    const payload = {
      ...values,
      tourTime: formatTime(values.tourTime),
    };
    console.log(payload);
    try {
      const resp = await tourRequestUpdate(id, payload);
      console.log(resp);
      dispatch(setOperation("null"));
      dispatch(setListRefreshToken(Math.random()));
      swalAlert("TourRequest created successfully", "success");
    } catch (err) {
      console.log(err);
      const errMsg = err?.response?.data?.tourDate
      swalAlert(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <Container className="tour-request-update-container">
      <Form className="tour-request-update-form" onSubmit={formik.handleSubmit}>
        <Row className="tour-request-update-row-title">
          <Col className="tour-request-update-col-title">
            <h3>{currentRecord?.advert?.title}</h3>
          </Col>
          <Col className="tour-request-update-col-price">
            <h3>{`$${currentRecord?.advert?.price}`}</h3>
          </Col>
        </Row>
        <Row className="mb-4 tour-request-update-col-location">
          <h6>
            {`${currentRecord?.advert?.district?.name}, `}{" "}
            {`${currentRecord?.advert?.city?.name}, `}{" "}
            {currentRecord?.advert?.country?.name}
          </h6>
        </Row>
        <Row  className="mb-4 tour-request-input-row">
        <Col   className="mb-3 tour-request-input-col" >
          <Form.Group className="tour-request-input-date"  controlId="tourDate">
            <Form.Text>Tour Date</Form.Text>
            <Form.Control
              type="date"
              plaseholder=""
              {...formik.getFieldProps("tourDate")}
              isInvalid={isInValid(formik, "tourDate")}
              isValid={isValid(formik, "tourDate")}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.tourDate}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col   className="mb-3 tour-request-input-col" >
          <Form.Group className="tour-request-input-time" controlId="tourTime">
            <Form.Text>Tour Time</Form.Text>
            <Form.Control
              as="select"
              className={`${
                isInValid(formik, "tourTime") ? "is-invalid" : ""
              } ${isValid(formik, "tourTime") ? "is-valid" : ""}`}
              {...formik.getFieldProps("tourTime")}
            >
              {currentRecord?.tourTime && (
                <option
                  key={currentRecord.tourTime}
                  value={currentRecord.tourTime}
                >
                  {currentRecord.tourTime}
                </option>
              )}
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.tourTime}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        </Row>
        <Row xs={12} md={2} lg={12}  className="tour-request-update-button-row">
          <Col  className="tour-request-update-button-col">
            <Button
            className="tour-request-update-button-calcel"
              onClick={handleCancel}
              variant="danger"
              type="button"
              disabled={!formik.isValid || loading}
            >
              {loading ? <ButtonLoader /> : null} Cancel
            </Button>
          </Col>
          <Col  className="tour-request-update-button-col">
            <Button
            className="tour-request-update-button-update"
              variant="danger"
              type="submit"
              disabled={!formik.isValid || loading}
            >
              {loading ? <ButtonLoader /> : null} Update
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default TourRequestUpdateForm;
