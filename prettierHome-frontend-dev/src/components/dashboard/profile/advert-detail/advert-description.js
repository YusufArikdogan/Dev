import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import "./advert-description.scss"


const AdvertDescription = () => {
    const { currentRecord } = useSelector((state) => state.misc);


  return (
    <>
    <Container className="description-container ">
        <h4 className='description-title' >Description</h4>
        <Row className='description-row' >{currentRecord?.description}Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Doloremque, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quos.</Row>

    </Container>
    </>

  )
}

export default AdvertDescription