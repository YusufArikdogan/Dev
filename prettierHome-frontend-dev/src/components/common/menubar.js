import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Image, Offcanvas } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import "./menubar.scss";
import { config } from "../../helpers/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserProfile from "./user-Profile";

const Menubar = () => {
  const { isUserLogin } = useSelector((state) => state.auth);
  const [mode, setMode] = useState("white");

  const handleScroll = () => {
    const scrollYPosition = window.scrollY;
    if (scrollYPosition > 250) {
      setMode("dark");
    } else {
      setMode("white");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar expand="lg" sticky="top" className={`bg-${mode}`}>
      <Container>
        <Image src={`/images/logo.png`} className="img-fluid" />

        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              <Image
                src={`/images/logo.png`}
                className="img-fluid"
                alt={config.project.name}
              />
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 navigation">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/ad/search">
                Properties
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
            <Nav>
              {isUserLogin ? (
                <Nav.Link></Nav.Link>
              ) : (
                <Nav.Link>
                  <Link to="/login">Login</Link> {` / `}
                  <Link to="/register">Register</Link>
                </Nav.Link>
              )}
              <Nav.Link
                className="border border-primary rounded-5 px-lg-4 text-center"
                as={Link}
                to="/ad"
              >
                Add Property <BsArrowRight className="ms-2" />
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        {isUserLogin ? <UserProfile /> : null}
      </Container>
    </Navbar>
  );
};

export default Menubar;
