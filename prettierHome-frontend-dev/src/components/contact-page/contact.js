import React from "react";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import Map from "./map";
import ContactForm from "./contact-form";
import ContactInfo from "./contact-info";
import "./contact.scss";
import Spacer from "../common/spacer";
import Address from "./address";

const Contact = () => {
  return (
    <div className="contact">
      <Map />
      <Spacer />
      <ContactInfo />

      <Container>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <ContactForm />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
      <Address />
      <Spacer />
    </div>
  );
};

export default Contact;
