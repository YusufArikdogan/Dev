import React from "react";
import Menubar from "../components/common/menubar";
import Footer from "../components/common/footer";
import { Outlet } from "react-router-dom";
import ScrollToTopButton from "../components/common/scroll-to-top-button";

const UserLayout = () => {
  return (
    <>
      <Menubar />
      <Outlet />
      <Footer />
      <ScrollToTopButton/>
    </>
  );
};

export default UserLayout;
