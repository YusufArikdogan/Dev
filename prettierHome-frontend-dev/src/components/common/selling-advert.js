import React from "react";
import { Container, Image } from "react-bootstrap";
import "./selling-advert.scss";
import { GoShieldLock } from "react-icons/go";
import { MdOutlineSettingsRemote } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";

const SellingAdvert = () => {
  return (
    <Container className="d-flex ">
      <div className="left-side flex-grow-1 flex-xl-grow-0">
        <Container className="left-side-main d-flex flex-column gap-3">
          <h2 className="mb-4">
            Let’s Find The Right <br /> Selling Option For You
          </h2>
          <div className="d-flex gap-3">
            <span className="circle">
              <MdOutlineSell size={42} />
            </span>
            <div>
              <h5>Sustainability Matters</h5>
              <h6>
                Green building practices and eco-friendly features <br /> are
                gaining popularity for environmentally <br /> conscious buyers.
              </h6>
            </div>
          </div>
          <div className="d-flex gap-3">
            <span className="circle">
              <MdOutlineSettingsRemote size={42} />
            </span>
            <div>
              <h5>Remote Work Impact</h5>
              <h6>
                Changing work patterns are reshaping housing <br /> preferences,
                favoring suburban and urban mixed- <br /> use developments.
              </h6>
            </div>
          </div>
          <div className="d-flex gap-3">
            <span className="circle">
              <GoShieldLock size={42} />
            </span>
            <div>
              <h5>Tech-Driven Marketing</h5>
              <h6>
                Real estate is embracing technology with virtual <br /> tours,
                3D models, and blockchain transactions.
              </h6>
            </div>
          </div>
        </Container>
      </div>
      <div className="right-side d-none d-xl-block ">
        <Image className="img-fluid" src={`/images/content/adverthome2.jpg`} />
      </div>
    </Container>
  );
};

export default SellingAdvert;
