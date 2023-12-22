import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllImagesByAdvertId } from "../../../../api/adverts-service";
import "./advert-image.scss";
import { Galleria } from 'primereact/galleria';
import { Container } from "react-bootstrap";

const AdvertImage = () => {
  const { currentRecord } = useSelector((state) => state.misc);
  const id = currentRecord?.id;
  const [images, setImages] = useState([]);
  console.log(images)

  const fetchData = async (id) => {
    try {
      const images = await getAllImagesByAdvertId(id);
      setImages(images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const responsiveOptions = [
    {
      breakpoint: '991px',
      numVisible: 4
    },
    {
      breakpoint: '767px',
      numVisible: 3
    },
    {
      breakpoint: '575px',
      numVisible: 3
    },{
      breakpoint: '350px',
      numVisible: 2
    },
  ];

  const itemTemplate = (item) => {
    return (
      <img
      className="item-template-image"
        src={`data:${item.type};base64, ${item.data}`}
        alt={item.name}
        style={{ width: "100%", height: "90%" }}
      />
    );
  };
  const thumbnailTemplate = (item) => {
    return (
      <img
      className="thumbnail-image"
        src={`data:${item.type};base64, ${item.data}`}
        alt={`Thumbnail ${item.name}`}
        style={{ width: '100%', cursor: 'pointer'  }}
      />
    );
  };

  return (
    <Container className="images-container">
      <Galleria
      className="galleria"
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        style={{ maxWidth: '100%' }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </Container>
  );
};

export default AdvertImage;
