import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
const DEFAULT_POSITION = [41.10776771956135, 28.79459098942375];

const LocationDisplay = ({ location }) => {
  console.log(location)
  location = location || DEFAULT_POSITION;
 
  const prettierMarker = new Icon({
    iconUrl: require("./marker/prettier-marker-sm.png"),
    iconRetinaUrl: require("./marker/prettier-marker-lg.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowSize: [40, 40],
    shadowAnchor: [12, 40],
  });

  return (
    <>
      {location && (
        <>
          <MapContainer
            center={location}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: "400px", width: "100%", cursor: "pointer" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={location} icon={prettierMarker}>
              <Popup>Location of your advert</Popup>
            </Marker>
          </MapContainer>
        </>
      )}
    </>
  );
};

export default LocationDisplay;
