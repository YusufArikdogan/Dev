import React from "react";
import { useParams } from "react-router-dom";
import Spacer from "../../../components/common/spacer";
import AdvertDetailPageHeader from "../../../components/dashboard/profile/advert-detail/advert-detail-page-header";
import AdvertTourRequest from "../../../components/dashboard/profile/advert-detail/advert-tour-request";
import AdvertDescription from "../../../components/dashboard/profile/advert-detail/advert-description";
import { Col, Container, Row } from "react-bootstrap";
import AdvertDetails from "../../../components/dashboard/profile/advert-detail/advert-details";
import AdvertImage from "../../../components/dashboard/profile/advert-detail/advert-image";
import AdvertLocation from "../../../components/dashboard/profile/advert-detail/advert-location";

const AdvertDetailPage = () => {
  const { slug } = useParams();

  return (
    <Container>
     
      <AdvertDetailPageHeader slug={slug} />
      <Row>
        <Col xs={12} md={12} lg={8}>
          <AdvertImage />
          <AdvertDescription />
          <AdvertDetails />
          <AdvertLocation/>
        </Col>
        <Col xs={0} md={0} >
          <AdvertTourRequest />
        </Col>
        <Spacer />
      </Row>
    </Container>
  );
};

export default AdvertDetailPage;
