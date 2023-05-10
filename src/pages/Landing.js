import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/landing.scss";
import Lottie from "lottie-react";
import landingBannerImg from "../assets/lottie-files/landing-banner-img";
import { Navbar } from "react-bootstrap";
import { Button } from "@mui/material";

function Landing(props) {
  return (
    <Container fluid className="landing">
      <Navbar expand="lg">
        <Container fluid>
          <Col className="navbar-left">
            <img
              src={require("../assets/images/logo.png")}
              alt="logo"
              height="50px"
            />
            <h3>Expense Tracker</h3>
          </Col>
        </Container>
      </Navbar>

      <Container fluid className="landing-banner">
        <Row>
          <Col md={6} className="landing-banner-left-col">
            <h1>Expense tracking made easy</h1>
            <p>
              Stay on the top of your spendings with Expense Tracker. An online
              tracking tool to help you better understand your habits and make a
              measurable change.
            </p>
            <Button onClick={props.signin}>Get Started</Button>
          </Col>
          <Col className="landing-banner-right-col">
            <Lottie loop={true} animationData={landingBannerImg}></Lottie>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Landing;
