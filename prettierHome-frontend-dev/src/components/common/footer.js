import React from "react";
import { Container, Row, Col, Image, Nav, Button } from "react-bootstrap";
import { config } from "../../helpers/config";
import "./footer.scss";
import { FaAppStore, FaGooglePlay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg={4} className="text-center text-lg-start mb-4 mb-lg-0">
            <Image
              src={`/images/logo-white.png`}
              className="img-fluid"
              alt={config.project.name}
            ></Image>

            <p className="mt-3">{config.project.description} </p>
            <div className="d-flex justify-content-center justify-content-lg-start gap-3 mt-4 mb-5 ">
              <Button variant="success" size="md" className="rounded-3 px-3">
                App Store <FaAppStore size={25} className="m ms-2" />
              </Button>
              <Button variant="success" size="md" className="rounded-3 px-3">
                Google Play
                <FaGooglePlay size={25} className="m ms-2" />
              </Button>
            </div>
          </Col>
          <Col md={6} lg={3} className="text-center text-lg-start mb-4 mb-lg-0">
            <h3>Quick Links</h3>
            <Nav className="flex-column">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/courses">Courses</Nav.Link>
              <Nav.Link href="/events">Events</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Col>
          <Col md={6} lg={4} className="text-center text-lg-start">
            <h3>Contact</h3>
            <Nav className="flex-column">
              <Nav.Link href={config.contact.mapURL} target="_blank">
                {config.contact.address}
              </Nav.Link>
              <Nav.Link href={`tel:${config.contact.phone1}`}>
                {config.contact.phone1}
              </Nav.Link>
              <Nav.Link href={`mailto:${config.contact.email}`}>
                {config.contact.email}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
