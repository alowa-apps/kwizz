import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "../layoutAdmin";
import { DataStore } from "@aws-amplify/datastore";
import { Questions, Quiz, QuestionsDB, Languages } from "../../models/";
import { Card, Row, Col, Form, Button, Alert, Modal } from "react-bootstrap";
import Resizer from "react-image-file-resizer";
import Video from "../video";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify from "@aws-amplify/core";
import Storage from "@aws-amplify/storage";
import { S3Image } from "aws-amplify-react";
import Select from "react-select";
import awsconfig from "../../aws-exports";
import Predictions, {
  AmazonAIPredictionsProvider,
} from "@aws-amplify/predictions";

Amplify.configure(awsconfig);

Amplify.register(Predictions);

Predictions.addPluggable(new AmazonAIPredictionsProvider());

function AdminEditQuestionPage() {
  let history = useHistory();
  const {
    location: {
      state: { status },
    },
  } = useHistory();

  const {
    location: {
      state: { questionId },
    },
  } = useHistory();

  localStorage.setItem("editQuestionStatus", status);
  localStorage.setItem("questionId", questionId);

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
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
    quizID: "",
  });
  const [error, setError] = useState([]);

  const [modalState, setModalState] = useState(false);

  async function listQuestion() {
    const resultQuestion = await DataStore.query(Questions, (c) =>
      c.id("eq", localStorage.getItem("questionId"))
    );
    setQuestion(resultQuestion[0]);
    setImage(resultQuestion[0].image);
  }

  function validate() {
    let errors = [];

    if (question.question === "" || typeof question.question === "undefined") {
      errors.push(<li>Question is empty</li>);
    }
    if (
      question.answerOne === "" ||
      typeof question.answerOne === "undefined"
    ) {
      errors.push(<li>Answer 1 is empty</li>);
    }
    if (
      question.answerTwo === "" ||
      typeof question.answerTwo === "undefined"
    ) {
      errors.push(<li>Answer 2 is empty</li>);
    }
    if (
      question.answerThree === "" ||
      typeof question.answerThree === "undefined"
    ) {
      errors.push(<li>Answer 3 is empty</li>);
    }
    if (
      question.answerFour === "" ||
      typeof question.answerFour === "undefined"
    ) {
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
      typeof image === "string" &&
      image.length > 0 &&
      typeof question.youtube === "string" &&
      question.youtube.length > 0
    ) {
      errors.push(<li>You can't use an image and youtube in the same time</li>);
    } else {
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
      let questionImage = "";
      let youtube = null;
      let category = null;
      let publicValue = null;

      if (typeof image === "string" && image.length > 0) {
        questionImage = image;
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

      const lang = await DataStore.query(Languages, (c) =>
        c.code("eq", language)
      );

      if (lang.length === 0) {
        await DataStore.save(
          new Languages({
            type: "lang",
            code: language,
          })
        );
      }

      const questionSaved = await DataStore.save(
        new Questions({
          image: questionImage,
          imageFromS3: true,
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
          quizID: localStorage.getItem("adminGameCode-editquiz"),
        })
      );

      if (publicValue) {
        await uploadImage("publicLibrary/" + file.name, file)
          .then(async (result) => {
            await DataStore.save(
              new QuestionsDB({
                image: result.key,
                imageFromS3: true,
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
                language: language,
              })
            );
          })
          .catch((err) => console.log(err));
      }

      const savedQuestionId = questionSaved.id;
      let order = [];
      order = JSON.parse(quiz.questionOrder);
      order.push(String(savedQuestionId));
      await DataStore.save(
        Quiz.copyOf(quiz, (updated) => {
          updated.questionOrder = JSON.stringify(order);
        })
      );

      history.push({
        pathname: "/edit-quiz",
        state: {
          quizID: localStorage.getItem("adminGameCode-editquiz"),
        },
      });
    }
  }

  async function uploadImage(path, file) {
    var fileInput = false;
    if (file) {
      fileInput = true;
    }
    if (fileInput) {
      return new Promise(async function (res, rej) {
        await Resizer.imageFileResizer(
          file,
          800,
          800,
          "JPEG",
          90,
          0,
          async (uri) => {
            Storage.put(path, uri, {
              contentType: file.type,
            })
              .then((result) => {
                //return result;
                res(result);
              })
              .catch((err) => console.log(err));
          },
          "blob"
        );
      });
    }
  }

  async function getLanguage(text) {
    const data = await Predictions.interpret({
      text: {
        source: {
          text: text,
        },
        type: "LANGUAGE",
      },
    })
      .then((result) => {
        return result.textInterpretation.language;
      })
      .catch((err) => console.log(err));

    return data;
  }

  async function handleEdit() {
    if (!validate()) {
      await DataStore.query(
        Quiz,
        localStorage.getItem("adminGameCode-editquiz")
      );

      let questionImage = "";
      let youtube = null;
      let category = null;

      if (image !== "") {
        questionImage = image;
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
        Questions.copyOf(original, (updated) => {
          updated.image = questionImage;
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

      const questionDB = await DataStore.query(QuestionsDB, (c) =>
        c.relatedQuestion("eq", localStorage.getItem("questionId"))
      );

      let key = questionImage;
      // This question exists in DB, so update question in DB
      if (questionDB.length > 0) {
        if (questionDB.image !== image) {
          await uploadImage("publicLibrary/" + file.name, file)
            .then(async (result) => {
              key = result.key;
            })
            .catch((err) => console.log(err));
        }
        await DataStore.save(
          QuestionsDB.copyOf(questionDB[0], (updated) => {
            updated.image = key;
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

        //copyImage from private bucket is not support yet, made an issue for that.
        // https://github.com/aws-amplify/amplify-js/issues/5998

        await DataStore.save(
          new QuestionsDB({
            image: key,
            imageFromS3: true,
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
            language: language,
          })
        );
      }

      history.push({
        pathname: "/edit-quiz",
        state: {
          quizID: localStorage.getItem("adminGameCode-editquiz"),
        },
      });
    }
  }

  async function onChangeImage(e) {
    const uploadedFile = e.target.files[0];

    setFile(uploadedFile);

    const result = await uploadImage(
      localStorage.getItem("adminGameCode-editquiz") + "/" + uploadedFile.name,
      uploadedFile
    );
    setImage(result.key);
  }

  function handleChange(e) {
    //e.preventDefault()

    switch (e.target.id) {
      case "public":
        setQuestion({
          ...question,
          public: !question.public,
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
          answerFourCorrect: false,
        });
        break;
      case "answer2":
        setQuestion({
          ...question,
          answerOneCorrect: false,
          answerTwoCorrect: true,
          answerThreeCorrect: false,
          answerFourCorrect: false,
        });
        break;
      case "answer3":
        setQuestion({
          ...question,
          answerOneCorrect: false,
          answerTwoCorrect: false,
          answerThreeCorrect: true,
          answerFourCorrect: false,
        });
        break;
      case "answer4":
        setQuestion({
          ...question,
          answerOneCorrect: false,
          answerTwoCorrect: false,
          answerThreeCorrect: false,
          answerFourCorrect: true,
        });
        break;
      default:
        break;
    }
  }

  function listCategories() {
    const categoriesList = [
      { value: "general", label: "general" },
      { value: "grammar", label: "grammar" },
      { value: "math", label: "math" },
      { value: "movies", label: "movies" },
      { value: "music", label: "music" },
      { value: "pictures", label: "pictures" },
      { value: "showbizz", label: "showbizz" },
      { value: "sports", label: "sports" },
      { value: "tech", label: "tech" },
      { value: "topography", label: "topography" },
      { value: "other", label: "other" },
    ];

    return (
      <Select
        options={categoriesList}
        className="floor"
        onChange={handleList}
        defaultValue={{ value: "general", label: "general" }}
      />
    );
  }

  async function deleteImage(key) {
    let original = await DataStore.query(
      Questions,
      localStorage.getItem("questionId")
    );

    if (typeof original === "undefined") {
      // question not saved yet but photo already uploaded
      await Storage.remove(key)
        .then(async (result) => {
          setImage("");
        })
        .catch((err) => console.log(err));
    } else if (
      typeof original.fromLibrary === "undefined" ||
      !original.fromLibrary
    ) {
      await Storage.remove(key)
        .then(async (result) => {
          if (typeof original !== "undefined") {
            // Update current question in Quiz
            await DataStore.save(
              Questions.copyOf(original, (updated) => {
                updated.image = "";
              })
            );
          }

          setImage("");
        })
        .catch((err) => console.log(err));
    } else {
      // when question is from the library don't delete the image object, but just the ref in the DB
      original = await DataStore.query(
        Questions,
        localStorage.getItem("questionId")
      );

      if (typeof original !== "undefined") {
        // Update current question in Quiz
        await DataStore.save(
          Questions.copyOf(original, (updated) => {
            updated.image = "";
          })
        );
      }

      setImage("");
    }
  }

  function handleList(e) {
    const categoryText = e.value;
    setQuestion({ ...question, category: categoryText });
  }

  useEffect(() => {
    if (localStorage.getItem("editQuestionStatus") === "edit") {
      listQuestion();
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
              {image !== null && typeof image !== "undefined" && image !== "" && (
                <div className="imageQuestion">
                  {localStorage.getItem("editQuestionStatus") === "add" ||
                  question.imageFromS3 ? (
                    <S3Image
                      imgKey={image}
                      theme={{
                        photoImg: { maxHeight: "300px" },
                      }}
                    />
                  ) : (
                    <img src={image} />
                  )}
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
              state: { quizID: localStorage.getItem("adminGameCode-editquiz") },
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

                          {listCategories()}
                        </Form.Group>
                      </Col>

                      <Col>
                        {!question.fromLibrary ? (
                          <Form.Group controlId="public">
                            {question.public ? (
                              <Form.Check
                                type="checkbox"
                                checked
                                label="Public library (question is copyable)"
                                onChange={handleChange}
                              />
                            ) : (
                              <Form.Check
                                type="checkbox"
                                label="Public library (question is copyable)"
                                onChange={handleChange}
                              />
                            )}
                          </Form.Group>
                        ) : (
                          <div className="libraryQuestion">
                            "This question is from the library"
                          </div>
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
                      <Form.Label>Image</Form.Label>

                      <Row>
                        {image !== null &&
                        typeof image !== "undefined" &&
                        image !== "" ? (
                          <Col>
                            <div>
                              {localStorage.getItem("editQuestionStatus") ===
                                "add" || question.imageFromS3 ? (
                                <div>
                                  <S3Image
                                    imgKey={image}
                                    theme={{
                                      photoImg: { maxHeight: "300px" },
                                    }}
                                  />
                                  <Button
                                    className="deleteImage"
                                    variant="danger"
                                    onClick={() => deleteImage(image)}
                                  >
                                    Delete Image
                                  </Button>
                                </div>
                              ) : (
                                <img src={image} alt="ramon" />
                              )}
                            </div>
                          </Col>
                        ) : (
                          <Col>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={onChangeImage}
                            />
                          </Col>
                        )}
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
                            placeholder="https://www.youtube.com/embed/....VIDEO-ID....."
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
