import React from "react";
import { Container } from "react-bootstrap";
import "./needhelp.scss";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiOutlinePhone } from "react-icons/hi";

const NeedHelp = () => {
  return (
    <Container className="mt-5 d-lg-flex justify-content-between align-items-center needhelp">
      <div className="ms-lg-4 mb-4 mb-lg-0">
        <h1>Need help? Talk to our expert.</h1>
        <h5>Talk to our experts or Browse through more properties.</h5>
      </div>
      <div className="d-flex flex-column flex-lg-row gap-4">
        <button className="border border-success bg-white rounded-5 text-center">
          Contact Us
          <HiArrowUpRight />
        </button>
        <button className="border-0 rounded-5 bg-success text-center">
          <HiOutlinePhone />
          Contact Us
        </button>
      </div>
    </Container>
  );
};

export default NeedHelp;
