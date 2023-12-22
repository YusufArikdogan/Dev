import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import "../tour-request-detail/tour-request-image.scss"

const TourRequestImage = () => {
const { currentRecord } = useSelector((state) => state.misc);
// console.log(currentRecord?.images[0]?.type);
const status=currentRecord?.status;



  return (
    <Container className='tour-request-container'>
      
      <Row className='tour-request-image-row'>
      <span className='status-span'>{status}</span>
          <img
            className=" tour-request-image"
            src={`data:${currentRecord?.images[0]?.type};base64,${currentRecord?.images[0]?.data}`}
            alt={`Resim ${currentRecord?.images[0]?.lenght}`}
          />
        </Row>

    </Container>

  )
}

export default TourRequestImage