import React from "react";
import Layout from "../layoutAdmin";
import { Breadcrumb, Card, Accordion } from "react-bootstrap";

function FAQ() {
  return (
    <div>
      <Layout>
        <div className="App">
          <Breadcrumb>
            <Breadcrumb.Item href="/admin">Admin Home</Breadcrumb.Item>
            <Breadcrumb.Item active>FAQ</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Accordion defaultActiveKey="0" className="accordion">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" className="header">
              How does kwizz.guru handle my data?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                You are in full control of your data. As soon as you remove a
                kwizz all the related data will be removed except the questions
                that you have added to the public library. We use google
                analytics with anonymous IP adresses. Our purpose is only to see
                how many users are using the site, we don't use this for other
                purposes.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1" className="header">
              I have build my Kwizz, what now?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                You can send the game code to your colleagues, friends and
                family and ask them to log in with their name and game code.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2" className="header">
              Can I test my kwizz first?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                Yes, open another browser on another device and log in with the
                game code. Run you quiz in the admin control and see the results
                in the other browser. Please make sure you reset your kwizz
                before your kwizzers log in.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3" className="header">
              Can I use a Kwizz multiple times?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                Yes, but make sure you reset after each run.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="4" className="header">
              Are there any costs?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                No. We are running this service for free as long as we can
                effort it ;) You can always contribute:{" "}
                <a
                  href="https://github.com/alowa-apps/kwizz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/alowa-apps/kwizz
                </a>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="5" className="header">
              I have an idea?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="5">
              <Card.Body>
                Please mention your idea{" "}
                <a
                  href="https://github.com/alowa-apps/kwizz/issues/new?assignees=&labels=&template=feature_request.md&title="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here.
                </a>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="6" className="header">
              How can we run a kwizz in the best way?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="6">
              <Card.Body>
                You can run and control the Kwizz in Chrome or Safari on any
                device. To control the kwizz you have the best overview on a
                larger screen. <b>Tip:</b> When the kwizz will be played on a
                phone, stay in the browser session and not switch between
                different apps.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Layout>
    </div>
  );
}

export default FAQ;
