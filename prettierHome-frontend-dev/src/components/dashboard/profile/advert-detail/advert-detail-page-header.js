import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getAdvertsBySlug } from "../../../../api/adverts-service";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentRecord,
  setListRefreshToken,
} from "../../../../store/slices/misc-slice";
import "./advert-detail-page-header.scss";
import { MdLocationOn } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { AiFillClockCircle } from "react-icons/ai";
import { IoEye } from "react-icons/io5";

function calculateWeeksSinceCreation(createdAt) {
  const creationDate = new Date(createdAt);

  const currentDate = new Date();

  const timeDifference = currentDate - creationDate;

  const weeksDifference = timeDifference / (1000 * 60 * 60 * 24 * 7);

  return Math.floor(weeksDifference);
}

const AdvertDetailPageHeader = (props) => {
  const slug = props.slug;
  const { currentRecord } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const loadAdvert = async () => {
    try {
      const advert = await getAdvertsBySlug(slug);
      dispatch(setCurrentRecord(advert));
      dispatch(setListRefreshToken(true));
      console.log(advert);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAdvert();
  }, []);

  const advert = currentRecord;
  console.log(advert);
  const createdAt = advert?.createdAt;
  const weeksSinceCreation = calculateWeeksSinceCreation(createdAt);
  return (
    <Container className="advert-detail-page-header">
      <Row className="advert-detail-title">{advert?.title}</Row>
      <Row className="advert-detail-info">
        <Col xs={12} md={9} lg={10} className="advert-detail-info-col">
          <Col className="advert-detail-col"> <MdLocationOn /> {`${advert?.city?.name}, `}{" "}{advert?.district?.name}</Col>
          <Col className="advert-detail-col"><IoMdPricetag /> {advert?.advertType?.title}</Col>
          <Col className="advert-detail-col"><AiFillClockCircle />{`${weeksSinceCreation} week${ weeksSinceCreation === 1 ? "" : "s"} ago`}</Col>
          <Col className="advert-detail-col"><IoEye />{advert?.viewCount}</Col>
        </Col> 
        <Col xs={0} md={3} lg={2} className="advert-detail-price">{`$${advert?.price}`}</Col>
      </Row>
    </Container>
  );
};

export default AdvertDetailPageHeader;
