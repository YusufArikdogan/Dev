import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Provider, LikeButton, RateButton, UpdownButton } from "@lyket/react";
import "./properties-card.scss";

const PropertiesCard = ({ ad }) => {
  return (
    <Link to={`/${ad.slug}`} className=" text-decoration-none">
      <Card className="popular-properties-card border-0">
        <Card.Img
          className=" equal-img"
          src={`data:${ad.image.type};base64, ${ad.image.data}`}
          alt={ad.image.name}
        />
        <Card.ImgOverlay className="d-flex justify-content-end align-items-start ">
          <Provider
            apiKey="acc0dbccce8e557db5ebbe6d605aaa"
            theme={{
              colors: {
                icon: "black",
                secondary: "red",
                background: "white",
                text: "transparent",
                primary: "white",
                highlight: "red",
              },
            }}
          >
            <div className="properties-card-like-btn">
              <LikeButton
                hideCounterIfLessThan={2}
                namespace="none"
                id="deneme"
                className="bg-dark"
                component={LikeButton.templates.Twitter}
              />
            </div>
          </Provider>
        </Card.ImgOverlay>
        <Card.Body className="popular-properties-anchor d-flex justify-content-between align-items-center">
          <div>
            <h4 className="card-title">${ad.price}</h4>

            <div>
              <h6>{ad.title}</h6>
              <h6>
                {ad.district.name}, {ad.city.name}
              </h6>
            </div>

            {/* <div className="d-flex my-1">
                        <h6>3 bed</h6>

                        <h6>3 bath</h6>
                        <h6>250 m2</h6>
                        <h6>1000 m2 lot</h6>
                      </div> */}
          </div>

          {/* <div>
                      <h6>{ad.title}</h6>
                      <h6>
                        {ad.district.name}, {ad.city.name}
                      </h6>
                    </div> */}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PropertiesCard;
