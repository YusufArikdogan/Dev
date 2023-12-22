import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useToast } from "../../../store/providers/toast-provider";
import { getMostPopularAdverts } from "../../../api/adverts-service";
import PropertiesCard from "../../properties-page/properties-card";

const PopularProperties = () => {
  const [loading, setLoading] = useState(false);
  const [popular, setPopular] = useState([]);
  const { showToast } = useToast();

  const fetchPopularAdverts = async () => {
    try {
      const resp = await getMostPopularAdverts(6);
      setPopular(resp);
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
    fetchPopularAdverts();
  }, []);

  return (
    <div className="type-properties">
      <Container>
        <div className="mb-4">
          <h2>Discover Popular Properties</h2>
          <h5>Featured properties</h5>
        </div>

        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 ">
          {popular.map((ad, index) => (
            <Col key={index}>
              <PropertiesCard ad={ad} index={index} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PopularProperties;
