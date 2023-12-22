import React, { useEffect, useState } from "react";
import { Card, Container, Toast } from "react-bootstrap";
import { getAdvertsByCities } from "../../../../api/adverts-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { useToast } from "../../../../store/providers/toast-provider";
import "./style.scss";

const ExplorePropertiesByCities = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const { showToast } = useToast();

  const fetchCities = async () => {
    try {
      const resp = await getAdvertsByCities();
      setCities(resp);
      console.log(resp);
    } catch (error) {
      const errMsg = Object.values(error.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <>
      <div className="type-properties">
        <Container>
          <div className="mb-4">
            <h2>Explore Properties</h2>
            <h5>By Cities</h5>
          </div>

          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            breakpoints={{
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {cities.map((city, index) => (
              <SwiperSlide key={index}>
                <Card key={index} className="by-cities-card">
                  <Card.Img
                    src={`images/icons/icon-istanbul.jpg`}
                    className="by-cities-card-img "
                    alt="cities card"
                  />
                  <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center ">
                    <h3>{city.cityName}</h3>
                    <h6>{city.cityQuantity} properties</h6>
                  </Card.ImgOverlay>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    </>
  );
};

export default ExplorePropertiesByCities;
