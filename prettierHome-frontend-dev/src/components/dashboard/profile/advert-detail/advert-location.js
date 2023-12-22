import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import LocationDisplay from '../location/LocationDisplay';
import { Col, Container, Row } from 'react-bootstrap';
import "./advert-description.scss"

const AdvertLocation = () => {
  const { currentRecord } = useSelector((state) => state.misc);
  console.log(currentRecord)

  useEffect(() => {
   
  }, [currentRecord]);

  return (
    <Container className="description-container" >
    <h2 className='location-title'>Location</h2>  
    <Row className='location-row'>
      <Col xs={12} sm={3} md={3} lg={3} className='location-col'>{`Country : ${currentRecord?.country?.name}`}</Col>
      <Col xs={12} sm={3} md={3} lg={3} className='location-col'>{`City : ${currentRecord?.city?.name}`}</Col>
      <Col xs={12} sm={3} md={3} lg={3} className='location-col'>{`District : ${currentRecord?.district?.name}`}</Col>
    </Row>

    <Row className="location-row p-4" ><LocationDisplay  location={currentRecord?.location}/></Row>
    </Container>
  )
}

export default AdvertLocation