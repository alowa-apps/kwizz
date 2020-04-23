/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.css";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import Logo from "../images/nerd.png";

const Layout = props => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            {" "}
            <Jumbotron>
              <span className="quizTitle">
                <img src={Logo} width="80px" alt="Kwizz" />
              </span>

              <span className="quizTitle">Kiwzz</span>

              <p className="quizDescription">
                Become thé Kwizz Guru amongst colleagues, friends and family.
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <main>{props.children}</main>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
