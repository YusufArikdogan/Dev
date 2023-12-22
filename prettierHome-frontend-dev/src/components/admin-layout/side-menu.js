import React, { useEffect, useState } from "react";
import { Button, Image, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./side-menu.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/auth-slice";
import { HiOutlineLogout } from "react-icons/hi";
import { swalConfirm } from "../../helpers/function/swal";
import userMenuData from "../../helpers/data/user-menu.json";
import {removeFromLocalStorage} from '../../helpers/function/encrypted-storage'

const SideMenu = () => {

  const loggedInUser = useSelector((state) => state.auth.user);
  const role = loggedInUser.role.toLowerCase();
  const active = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleLogout = async () => {
    const resp = await swalConfirm("Are you sure to logout?", "");
    if (!resp.isConfirmed) return;
    dispatch(logout());
    removeFromLocalStorage("token");
    navigate("/");

  };


  return (
    <div className="side-menu">
      <Nav className="navvvv" >
        <div className="side-logo">
          <Image
            src="/images/logo-white-2.png"
            alt="stack-logo"
            className="img-fluid p-3 mt-4 "
          />
        </div>
       
        {userMenuData[role].map((item, index) => (
          <Nav.Link 
            className={active === index ? "active-link" : "standart-link"}
            as={Link} to={item.link}
            key={index}
          >
            {item.title}
          </Nav.Link>
            ))}
        <Button
          className="logout-btn"
          onClick={() => handleLogout()}>
          LOGOUT <HiOutlineLogout className="logout-icon" /> 
        </Button>
      </Nav>
    </div>
  );
};

export default SideMenu;
