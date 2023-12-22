import React from "react";
import NeedHelp from "../components/common/needhelp";
import Spacer from "../components/common/spacer";
import Banner from "../components/home-page/banner";
import ExplorePropertiesByType from "../components/home-page/properties/by-types";
import ExplorePropertiesByCities from "../components/home-page/properties/by-cities";
import RegisterAdvert from "../components/home-page/register-advert";
import SellingAdvert from "../components/common/selling-advert";
import PopularProperties from "../components/home-page/popular-properties";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Spacer />
      <ExplorePropertiesByType />
      <Spacer />
      <ExplorePropertiesByCities />
      <Spacer />
      <RegisterAdvert />
      <Spacer />
      <PopularProperties />
      <Spacer height={150} />
      <SellingAdvert />
      <Spacer />
      <NeedHelp />
      <Spacer />
    </>
  );
};

export default HomePage;
