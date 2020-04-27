import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "../layoutAdmin";
import { DataStore } from "@aws-amplify/datastore";
import { Questions, Quiz, QuestionsDB, Languages } from "../../models/";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Dropdown,
  DropdownButton,
  Modal,
  Image
} from "react-bootstrap";
import Video from "../video";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import awsexports from "../../aws-exports";
import Predictions, {
  AmazonAIPredictionsProvider
} from "@aws-amplify/predictions";

Auth.configure(awsexports);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function AdminEditQuestionPage() {
  let history = useHistory();
  const {
    location: {
      state: { status }
    }
  } = useHistory();

  const {
    location: {
      state: { questionId }
    }
  } = useHistory();

  localStorage.setItem("editQuestionStatus", status);
  localStorage.setItem("questionId", questionId);

  const [question, setQuestion] = useState({
    image: "",
    youtube: "",
    question: "",
    answerOne: "",
    answerOneCorrect: "",
    answerTwo: "",
    answerTwoCorrect: "",
    answerThree: "",
    answerThreeCorrect: "",
    answerFour: "",
    answerFourCorrect: "",
    category: null,
    public: null,
    order: 0,
    quizID: ""
  });
  const [error, setError] = useState([]);

  const [modalState, setModalState] = useState(false);

  async function listQuestion(setQuestion) {
    const question = await DataStore.query(
      Questions,

      c => c.id("eq", localStorage.getItem("questionId"))
    );
    setQuestion(question[0]);
  }

  function validate() {
    let errors = [];

    if (question.question === "") {
      errors.push(<li>Question is empty</li>);
    }
    if (question.answerOne === "") {
      errors.push(<li>Answer 1 is empty</li>);
    }
    if (question.answerTwo === "") {
      errors.push(<li>Answer 2 is empty</li>);
    }
    if (question.answerThree === "") {
      errors.push(<li>Answer 3 is empty</li>);
    }
    if (question.answerFour === "") {
      errors.push(<li>Answer 4 is empty</li>);
    }

    if (
      question.answerOneCorrect === "" ||
      typeof question.answerOneCorrect === "undefined" ||
      question.answerTwoCorrect === "" ||
      typeof question.answerTwoCorrect === "undefined" ||
      question.answerThreeCorrect === "" ||
      typeof question.answerThreeCorrect === "undefined" ||
      question.answerFourCorrect === "" ||
      typeof question.answerFourCorrect === "undefined"
    ) {
      errors.push(<li>Select one answer which is the correct one</li>);
    }

    if (
      typeof question.image === "string" &&
      question.image.length > 0 &&
      typeof question.youtube === "string" &&
      question.youtube.length > 0
    ) {
      errors.push(<li>You can't use an image and youtube in the same time</li>);
    } else {
      if (
        question.image !== "" &&
        typeof question.image !== "undefined" &&
        question.image !== null &&
        !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
          question.image
        )
      ) {
        errors.push(<li>Use a valid image url</li>);
      }

      if (
        question.youtube !== "" &&
        typeof question.youtube !== "undefined" &&
        question.youtube !== null &&
        !/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com))(\/(embed\/)(.+)?)$/.test(
          question.youtube
        )
      ) {
        errors.push(
          <li>
            Use a valid YouTube video url, like
            https://www.youtube.com/embed/VIDEO-CODE
          </li>
        );
      }
    }

    if (errors.length > 0) {
      errors.splice(0, 0, "There are some errors:");
    } else {
      errors = [];
    }

    setError(errors);

    if (errors.length > 0) {
      return true;
    }
    return false;
  }

  async function handleCreate() {
    if (!validate()) {
      const quiz = await DataStore.query(
        Quiz,
        localStorage.getItem("adminGameCode-editquiz")
      );
      let image = null;
      let youtube = null;
      let category = null;
      let publicValue = null;

      if (typeof question.image === "string" && question.image.length > 0) {
        image = question.image;
      }
      if (typeof question.youtube === "string" && question.youtube.length > 0) {
        youtube = question.youtube;
      }

      if (typeof question.category !== "undefined") {
        category = question.category;
      }

      if (typeof question.public === "undefined") {
        publicValue = false;
      } else {
        publicValue = question.public;
      }

      let language = "unknown";
      const data = await getLanguage(question.question);
      // const data = "nl";

      if (typeof data !== "undefined") {
        language = data;
      }

      const lang = await DataStore.query(Languages, c =>
        c.code("eq", language)
      );

      if (lang.length === 0) {
        await DataStore.save(
          new Languages({
            type: "lang",
            code: language
          })
        );
      }

      const questionSaved = await DataStore.save(
        new Questions({
          image: image,
          youtube: youtube,
          public: publicValue,
          category: category,
          question: question.question,
          answerOne: question.answerOne,
          answerOneCorrect: question.answerOneCorrect,
          answerTwo: question.answerTwo,
          answerTwoCorrect: question.answerTwoCorrect,
          answerThree: question.answerThree,
          answerThreeCorrect: question.answerThreeCorrect,
          answerFour: question.answerFour,
          answerFourCorrect: question.answerFourCorrect,
          quizID: localStorage.getItem("adminGameCode-editquiz")
        })
      );

      if (publicValue) {
        await DataStore.save(
          new QuestionsDB({
            image: image,
            youtube: youtube,
            public: publicValue,
            category: category,
            question: question.question,
            answerOne: question.answerOne,
            answerOneCorrect: question.answerOneCorrect,
            answerTwo: question.answerTwo,
            answerTwoCorrect: question.answerTwoCorrect,
            answerThree: question.answerThree,
            answerThreeCorrect: question.answerThreeCorrect,
            answerFour: question.answerFour,
            answerFourCorrect: question.answerFourCorrect,
            relatedQuestion: questionSaved.id,
            language: language
          })
        );
      }

      const savedQuestionId = questionSaved.id;
      let order = [];
      order = JSON.parse(quiz.questionOrder);
      order.push(String(savedQuestionId));
      await DataStore.save(
        Quiz.copyOf(quiz, updated => {
          updated.questionOrder = JSON.stringify(order);
        })
      );

      history.push({
        pathname: "/edit-quiz",
        state: {
          quizID: localStorage.getItem("adminGameCode-editquiz")
        }
      });
    }
  }

  async function getLanguage(text) {
    const data = await Predictions.interpret({
      text: {
        source: {
          text: text
        },
        type: "LANGUAGE"
      }
    })
      .then(result => {
        return result.textInterpretation.language;
      })
      .catch(err => console.log(err));

    return data;
  }

  async function handleEdit() {
    if (!validate()) {
      await DataStore.query(
        Quiz,
        localStorage.getItem("adminGameCode-editquiz")
      );

      let image = null;
      let youtube = null;
      let category = null;

      if (question.image !== "") {
        image = question.image;
      }

      if (question.category !== "") {
        category = question.category;
      }

      if (question.youtube !== "") {
        youtube = question.youtube;
      }

      const original = await DataStore.query(
        Questions,
        localStorage.getItem("questionId")
      );

      // Update current question in Quiz
      await DataStore.save(
        Questions.copyOf(original, updated => {
          updated.image = image;
          updated.youtube = youtube;
          updated.question = question.question;
          updated.answerOne = question.answerOne;
          updated.answerTwo = question.answerTwo;
          updated.answerThree = question.answerThree;
          updated.answerFour = question.answerFour;
          updated.answerOneCorrect = question.answerOneCorrect;
          updated.answerTwoCorrect = question.answerTwoCorrect;
          updated.answerThreeCorrect = question.answerThreeCorrect;
          updated.answerFourCorrect = question.answerFourCorrect;
          updated.public = question.public;
          updated.category = category;
        })
      );

      const questionDB = await DataStore.query(QuestionsDB, c =>
        c.relatedQuestion("eq", localStorage.getItem("questionId"))
      );

      // This question exists in DB, so update question in DB
      if (questionDB.length > 0) {
        await DataStore.save(
          QuestionsDB.copyOf(questionDB[0], updated => {
            updated.image = image;
            updated.youtube = youtube;
            updated.question = question.question;
            updated.answerOne = question.answerOne;
            updated.answerTwo = question.answerTwo;
            updated.answerThree = question.answerThree;
            updated.answerFour = question.answerFour;
            updated.answerOneCorrect = question.answerOneCorrect;
            updated.answerTwoCorrect = question.answerTwoCorrect;
            updated.answerThreeCorrect = question.answerThreeCorrect;
            updated.answerFourCorrect = question.answerFourCorrect;
            updated.public = question.public;
            updated.category = category;
          })
        );
      }

      // Add Question to Question DB, because public has beed marked during edit phase
      if (question.public && !question.fromLibrary && questionDB.length === 0) {
        const language = await getLanguage(question.question);
        //const language = "nl";

        await DataStore.save(
          new QuestionsDB({
            image: image,
            youtube: youtube,
            public: question.public,
            category: category,
            question: question.question,
            answerOne: question.answerOne,
            answerOneCorrect: question.answerOneCorrect,
            answerTwo: question.answerTwo,
            answerTwoCorrect: question.answerTwoCorrect,
            answerThree: question.answerThree,
            answerThreeCorrect: question.answerThreeCorrect,
            answerFour: question.answerFour,
            answerFourCorrect: question.answerFourCorrect,
            relatedQuestion: localStorage.getItem("questionId"),
            language: language
          })
        );
      }

      history.push({
        pathname: "/edit-quiz",
        state: {
          quizID: localStorage.getItem("adminGameCode-editquiz")
        }
      });
    }
  }

  function handleChange(e) {
    //e.preventDefault()

    switch (e.target.id) {
      case "public":
        setQuestion({
          ...question,
          public: !question.public
        });
        break;
      case "question":
        setQuestion({ ...question, question: e.target.value });
        break;
      case "answer1":
        setQuestion({ ...question, answerOne: e.target.value });
        break;
      case "answer2":
        setQuestion({ ...question, answerTwo: e.target.value });
        break;
      case "answer3":
        setQuestion({ ...question, answerThree: e.target.value });
        break;
      case "answer4":
        setQuestion({ ...question, answerFour: e.target.value });
        break;
      case "image":
        setQuestion({ ...question, image: e.target.value });
        break;
      case "youtube":
        setQuestion({ ...question, youtube: e.target.value });
        break;
      default:
        break;
    }
  }

  function handleClick(e) {
    switch (e.target.id) {
      case "answer1":
        setQuestion({
          ...question,
          answerOneCorrect: true,
          answerTwoCorrect: false,
          answerThreeCorrect: false,
          answerFourCorrect: false
        });
        break;
      case "answer2":
        setQuestion({
          ...question,
          answerOneCorrect: false,
          answerTwoCorrect: true,
          answerThreeCorrect: false,
          answerFourCorrect: false
        });
        break;
      case "answer3":
        setQuestion({
          ...question,
          answerOneCorrect: false,
          answerTwoCorrect: false,
          answerThreeCorrect: true,
          answerFourCorrect: false
        });
        break;
      case "answer4":
        setQuestion({
          ...question,
          answerOneCorrect: false,
          answerTwoCorrect: false,
          answerThreeCorrect: false,
          answerFourCorrect: true
        });
        break;
      default:
        break;
    }
  }

  function listCategories() {
    const categoriesList = [
      "food",
      "general",
      "grammar",
      "math",
      "movies",
      "music",
      "pictures",
      "showbizz",
      "sports",
      "tech",
      "topography",
      "other"
    ];

    const items = categoriesList.map(item => {
      return <Dropdown.Item onClick={handleList}>{item}</Dropdown.Item>;
    });
    return items;
  }

  function handleList(e) {
    const categoryText = e.target.innerText;
    setQuestion({ ...question, category: categoryText });
  }

  useEffect(() => {
    if (localStorage.getItem("editQuestionStatus") === "edit") {
      listQuestion(setQuestion);
    } else {
      const initQuestion = [];
      setQuestion(initQuestion);
    }

    listCategories();

    return () => {};
  }, []);
  return (
    <AmplifyAuthenticator>
      <div className="signout">
        {" "}
        <AmplifySignOut />
      </div>
      <Layout>
        <div className="App">
          <Modal show={modalState}>
            <Modal.Header>
              <Modal.Title>{question.question}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {question.youtube !== null &&
                typeof question.youtube !== "undefined" &&
                question.youtube !== "" && (
                  <div className="videoQuestion">
                    <Video videoSrcURL={question.youtube} videoTitle="" />
                  </div>
                )}
              {question.image !== null &&
                typeof question.image !== "undefined" &&
                question.image !== "" && (
                  <div className="imageQuestion">
                    <Image src={question.image} fluid />
                  </div>
                )}
            </Modal.Body>
            <Modal.Body>
              <li>{question.answerOne}</li>
              <li>{question.answerTwo}</li>
              <li>{question.answerThree}</li>
              <li>{question.answerFour}</li>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalState(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Link
            to={{
              pathname: "/edit-quiz",
              state: { quizID: localStorage.getItem("adminGameCode-editquiz") }
            }}
          >
            <Button className="backButton" variant="secondary">
              Back
            </Button>
          </Link>

          {error.length > 0 && <Alert variant="danger">{error}</Alert>}
          <Card>
            <Card.Body>
              <Card.Title>{question.question}</Card.Title>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="question">
                      <Form.Label>Question</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter question"
                        onChange={handleChange}
                        value={question.question}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <Form.Group controlId="category">
                          <Form.Label>Category</Form.Label>
                          <DropdownButton
                            id="dropdown-basic-button"
                            variant="warning"
                            title={
                              question.category === "" ||
                              question.category === null
                                ? "Category"
                                : question.category
                            }
                          >
                            {listCategories()}
                          </DropdownButton>
                        </Form.Group>
                      </Col>

                      <Col>
                        {!question.fromLibrary && (
                          <Form.Group controlId="public">
                            {question.public ? (
                              <Form.Check
                                type="checkbox"
                                checked
                                label="Public (Question is copyable by others)"
                                onChange={handleChange}
                              />
                            ) : (
                              <Form.Check
                                type="checkbox"
                                label="Public (Question is copyable by others)"
                                onChange={handleChange}
                              />
                            )}
                          </Form.Group>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="answer1">
                      <Form.Label>Answer 1</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            value={question.answerOne}
                            placeholder="Enter answer 1"
                            onChange={handleChange}
                          />
                        </Col>

                        <Col>
                          {question.answerOneCorrect ? (
                            <Form.Check
                              type="radio"
                              checked
                              label="Correct answer?"
                              onChange={handleClick}
                            />
                          ) : (
                            <Form.Check
                              type="radio"
                              label="Correct answer?"
                              onChange={handleClick}
                            />
                          )}
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="answer2">
                      <Form.Label>Answer 2</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            value={question.answerTwo}
                            placeholder="Enter answer 2"
                            onChange={handleChange}
                          />
                        </Col>

                        <Col>
                          {question.answerTwoCorrect ? (
                            <Form.Check
                              type="radio"
                              checked
                              label="Correct answer?"
                              onChange={handleClick}
                            />
                          ) : (
                            <Form.Check
                              type="radio"
                              label="Correct answer?"
                              onChange={handleClick}
                            />
                          )}
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="answer3">
                      <Form.Label>Answer 3</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            value={question.answerThree}
                            placeholder="Enter answer 3"
                            onChange={handleChange}
                          />
                        </Col>

                        <Col>
                          {question.answerThreeCorrect ? (
                            <Form.Check
                              type="radio"
                              checked
                              label="Correct answer?"
                              onChange={handleClick}
                            />
                          ) : (
                            <Form.Check
                              type="radio"
                              label="Correct answer?"
                              onChange={handleClick}
                            />
                          )}
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="answer4">
                      <Form.Label>Answer 4</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            value={question.answerFour}
                            placeholder="Enter answer 4"
                            onChange={handleChange}
                          />
                        </Col>

                        <Col>
                          {question.answerFourCorrect ? (
                            <Form.Check
                              type="radio"
                              checked
                              label="Correct answer?"
                              onChange={handleClick}
                            />
                          ) : (
                            <Form.Check
                              type="radio"
                              label="Correct answer?"
                              onChange={handleClick}
                            />
                          )}
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="image">
                      <Form.Label>Afbeelding</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            value={question.image}
                            placeholder="Enter URL"
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="youtube">
                      <Form.Label>Youtube URL</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            value={question.youtube}
                            placeholder="https://www.youtube.com/embed/........."
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <span>
                  <Button
                    onClick={() => {
                      setModalState(true);
                    }}
                    className="preview"
                    variant="primary"
                  >
                    Preview
                  </Button>
                </span>
                <span>
                  <Button
                    onClick={() => {
                      if (
                        localStorage.getItem("editQuestionStatus") === "edit"
                      ) {
                        handleEdit();
                      } else {
                        handleCreate();
                      }
                    }}
                    variant="primary"
                  >
                    Save question
                  </Button>
                </span>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Layout>
    </AmplifyAuthenticator>
  );
}

export default AdminEditQuestionPage;
