import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./about.scss";

const About = () => {
  return (
    <>
      <Container>
        <Row className="about">
          <Col xl={7}>
            <Image
              src="./images/about.png"
              className=" img img-fluid-rounded "
            ></Image>
          </Col>
          <Col xl={5}>
            <h3>We're on a Mission to Change</h3>
            <h3>View of Real Estate Field.</h3>
            <p>
              At the heart of our vision lies a resolute commitment to transform
              the landscape of the real estate industry. We're not just a
              company; we're on a mission to change the very essence of how real
              estate is perceived and experienced. Our journey is defined by
              innovation, transparency, and a relentless pursuit of excellence.
              With a bold and forward-thinking approach, we seek to
              revolutionize the traditional norms of the real estate field,
              making it more accessible, efficient, and customer-centric. Our
              aspiration is to shape a future where buying, selling, or
              investing in real estate is a seamless and empowering experience
              for all. Join us on this transformative journey as we rewrite the
              narrative of real estate.
            </p>

            <div className="d-flex flex-column flex-lg-row gap-5  ">
              <div>
                <Image src="./images/circle.png" />
                <p>Modern Architect</p>
              </div>
              <div>
                <Image src="./images/circle.png" />
                <p> Green Building</p>{" "}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default About;
