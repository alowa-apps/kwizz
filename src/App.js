import React from "react";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { Button, Card, Alert, Form } from "react-bootstrap";
import Layout from "./components/layout";
import awsConfig from "./aws-exports";
import { Quiz, Subscribers, Responses } from "./models/";
import Authenticator from "./components/auth";
import Game from "./components/game";
import Admin from "./components/admin/admin";
import AdminEdit from "./components/admin/admin-editquiz";
import AdminRun from "./components/admin/admin-runquiz";
import AdminFAQ from "./components/admin/admin-faq";
import AdminEditQuestion from "./components/admin/admin-editquestion";
import AdminLibrary from "./components/admin/question-library";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactGA from "react-ga";
ReactGA.initialize("UA-154890668-2", { testMode: true });
ReactGA.pageview(window.location.pathname + window.location.search);
Amplify.configure(awsConfig);
DataStore.configure(awsConfig);

export default class IndexPage extends React.Component {
  state = {
    name: "",
    gamecode: "",
    error:
      "The log in take a few seconds, this is a known issue where we are working on.",
    path: ""
  };

  constructor() {
    super();
    Auth.currentCredentials()
      .then(d => console.log("data: ", d))
      .catch(e => console.log("error: ", e));

    this.changePath = this.changePath.bind(this);
    this.signout = this.signout.bind(this);
    this.startApp = this.startApp.bind(this);
  }

  componentDidMount() {
    console.log("app started");
    this.init = DataStore.start();

    if (localStorage.getItem("path") !== null) {
      this.changePath(localStorage.getItem("path"));
    }
  }

  signout() {
    DataStore.delete(Subscribers, localStorage.getItem("subscriber"));
    DataStore.delete(Responses, c =>
      c.subscriber("eq", localStorage.getItem("subscriber"))
    );

    this.setState({
      name: "",
      gamecode: "",
      error: "",
      path: ""
    });
    localStorage.setItem("path", "");
    localStorage.setItem("gamecode", "");
    localStorage.setItem("subscriber", "");
  }

  componentWillUnmount() {
    //this.init.unsubscribe();
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
    this.setState({ error: "" });

    let gamecode = this.state.gamecode;
    const name = this.state.name;

    if (gamecode === "" || name === "") {
      this.setState({ error: "Fill in a gamecode and name" });
    } else if (typeof gamecode !== "string" || typeof name !== "string") {
      this.setState({ error: "Fill in a correct values" });
    } else if (gamecode.length < 8) {
      this.setState({ error: "Fill in a 8 digits gamecode" });
    } else {
      // check the 8 digit code and and the extra - to preven doubles from the Dynamodb ID
      const quiz = await DataStore.query(Quiz, c =>
        c.id("beginsWith", this.state.gamecode + "-")
      );

      if (quiz.length === 0) {
        this.setState({ error: "There is no game with this code" });
      } else {
        localStorage.setItem("gamecode", quiz[0].id);
        this.changePath("auth");
      }
    }
  };

  changePath(url) {
    this.setState({ path: url });
    localStorage.setItem("path", url);
  }

  startApp() {
    const error = this.state.error;
    const path = this.state.path;

    if (path === "auth") {
      return (
        <Authenticator changePath={this.changePath} name={this.state.name} />
      );
    }
    if (path === "game") {
      return <Game signout={this.signout} />;
    }

    return (
      <div>
        <Layout path={this.state.path}>
          <div className="buildQuiz">
            <Link to="/admin">
              <Button variant="warning">Open Kwizz builder</Button>
            </Link>
          </div>
          {error.length > 0 && <Alert variant="danger">{error}</Alert>}
          <Card>
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>What is your name?</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    name="name"
                    value={this.state.firstName}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="gameCode">
                  <Form.Label>Gamecode</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    name="gamecode"
                    value={this.state.lastName}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Form>

              <Button size="lg" onClick={this.handleSubmit}>
                Start
              </Button>
            </Card.Body>
          </Card>
        </Layout>
      </div>
    );
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this.startApp()}
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/edit-quiz">
            <AdminEdit />
          </Route>
          <Route path="/run-quiz">
            <AdminRun />
          </Route>
          <Route path="/edit-question">
            <AdminEditQuestion />
          </Route>
          <Route path="/library">
            <AdminLibrary />
          </Route>
          <Route path="/admin-faq">
            <AdminFAQ />
          </Route>
        </Switch>
      </Router>
    );
  }
}
