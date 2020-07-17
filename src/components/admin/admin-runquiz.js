import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../layoutAdmin";
import { DataStore } from "@aws-amplify/datastore";
import { Quiz, Subscribers, Questions, Responses } from "../../models/";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Modal,
  Image
} from "react-bootstrap";
import { S3Image } from "aws-amplify-react";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Video from "../video";
import Score from "../score";

function AdminPage(props) {
  const {
    location: {
      state: { quizID }
    }
  } = useHistory();
  localStorage.setItem("admingamecode", quizID);
  const adminGameCode = quizID;

  const [subscribers, setSubscribers] = useState([]);

  const [quiz, setQuiz] = useState([]);

  let initSec = 0;
  let initActive = false;
  let initTimer = 30;

  if (parseInt(localStorage.getItem("seconds")) > 0) {
    initSec = parseInt(localStorage.getItem("seconds"));
    initTimer = parseInt(localStorage.getItem("timer"));
    initActive = true;
  }
  const [seconds, setSeconds] = useState(initSec);
  const [isActive, setIsActive] = useState(initActive);
  const [time, setTimer] = useState(initTimer);

  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [error, setError] = useState("");
  const [stopModal, setStopModal] = useState(false);
  const [topList, setToplist] = useState([]);
  const [rightAnswer, setRightAnswer] = useState("");
  const [responses, setReponses] = useState(0);
  const [resetModal, setResetModal] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const handleModalClose = () => setStopModal(false);
  const handleModalShow = () => {
    setStopModal(true);
  };
  const handleResetModalClose = () => setResetModal(false);
  const handleResetModalShow = () => {
    setResetModal(true);
  };

  async function listSubscribers(setSubscribers) {
    const subscribers = await DataStore.query(Subscribers, c =>
      c.quizID("eq", adminGameCode)
    );
    setSubscribers(subscribers);
  }

  async function listQuiz(setQuiz, setCurrentQuestion) {
    const quiz = await DataStore.query(Quiz, c => c.id("eq", adminGameCode));
    const quizdata = quiz[0];

    const totalQuestions = JSON.parse(quizdata.questionOrder);

    setTotalQuestions(totalQuestions.length);

    let currentIndex = 0;

    totalQuestions.map((object, index) => {
      if (object === quizdata.currentQuestion) {
        currentIndex = index + 1;
        return;
      }
    });

    setQuestionIndex(currentIndex);

    setQuiz(quizdata);
    if (quizdata.currentQuestion !== null) {
      getQuestion(setCurrentQuestion, quizdata.currentQuestion);
    }
  }

  async function getQuestion(setCurrentQuestion, id) {
    if (id !== "") {
      const question = await DataStore.query(Questions, c => c.id("eq", id));
      let rightAnswer = "";
      if (question[0].answerOne !== "" && question[0].answerOneCorrect) {
        rightAnswer = question[0].answerOne;
      }
      if (question[0].answerTwo !== "" && question[0].answerTwoCorrect) {
        rightAnswer = question[0].answerTwo;
      }
      if (question[0].answerThree !== "" && question[0].answerThreeCorrect) {
        rightAnswer = question[0].answerThree;
      }
      if (question[0].answerFour !== "" && question[0].answerFourCorrect) {
        rightAnswer = question[0].answerFour;
      }
      setRightAnswer(rightAnswer);

      setCurrentQuestion(question[0]);
    }
  }

  async function getScores(setToplist) {
    const subscribers = await DataStore.query(Subscribers, c =>
      c.quizID("eq", localStorage.getItem("adminGameCode-editquiz"))
    );

    const subscriberList = subscribers.sort(function(a, b) {
      return b.score - a.score;
    });

    setToplist(subscriberList);
  }

  async function listResponses(setReponses, currentQuestion) {
    const responses = await DataStore.query(Responses, c =>
      c.question("eq", currentQuestion.id)
    );

    setReponses(responses.length);
  }

  async function resetQuiz() {
    //deleteSubscribers
    await DataStore.delete(Subscribers, c => c.quizID("eq", adminGameCode));

    await DataStore.delete(Responses, c => c.quiz("eq", adminGameCode));

    // remove CurrentQuestion in Quiz
    const originalQuiz = await DataStore.query(Quiz, adminGameCode);

    await DataStore.save(
      Quiz.copyOf(originalQuiz, updated => {
        updated.currentQuestion = null;
      })
    );

    setResetModal(false);
  }

  useEffect(() => {
    if (adminGameCode !== "") {
      localStorage.setItem("adminGameCode-editquiz", adminGameCode);
    }
    const subscription = DataStore.observe(Subscribers).subscribe(() => {
      listSubscribers(setSubscribers);
    });

    const quiz = DataStore.observe(
      Quiz,
      localStorage.getItem("adminGameCode-editquiz")
    ).subscribe(() => {
      console.log("change");
      listQuiz(setQuiz, setCurrentQuestion);
    });

    const responses = DataStore.observe(Responses).subscribe(() => {
      listResponses(setReponses, currentQuestion);
    });

    listQuiz(setQuiz, setCurrentQuestion);
    listSubscribers(setSubscribers);

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        const timer = parseInt(time);

        if (seconds === 0) {
          changeScreen(0);
        }

        if (seconds === timer) {
          changeScreen(1);
          getScores(setToplist);
        }

        if (seconds === timer + 5) {
          changeScreen(2);
        }

        setSeconds(seconds + 1);
        localStorage.setItem("seconds", seconds + 1);

        if (seconds === timer + 10) {
          setReponses(0);
          setSeconds(0);
          localStorage.setItem("seconds", 0);
          setIsActive(false);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => {
      subscription.unsubscribe();
      quiz.unsubscribe();
      responses.unsubscribe();
      clearInterval(interval);
    };
  }, [
    isActive,
    seconds,
    time,
    topList,
    rightAnswer,
    responses,
    totalQuestions
  ]);

  //Process next question or end quiz (screen = 3)
  async function processNextQuestion(currentQuestion, questionOrder) {
    //transfor string from appsync in array
    var questionOrderArray = JSON.parse(questionOrder);
    //find the index number of the current question in the array
    var currentQuestionIndex = questionOrderArray.findIndex(
      k => k === currentQuestion
    );

    //find arraylength, if array length is the same as the next number, end quiz by update screen to 3. -1 to correct that array starts at 0
    const arrayLength = questionOrderArray.length - 1;

    if (parseInt(currentQuestionIndex) === arrayLength) {
      const original = await DataStore.query(Quiz, adminGameCode);
      await DataStore.save(
        Quiz.copyOf(original, updated => {
          updated.view = 3;
        })
      );
    } else {
      //add +1 to current index number to find next question
      var next = parseInt(currentQuestionIndex) + 1;

      const original = await DataStore.query(Quiz, adminGameCode);

      await DataStore.save(
        Quiz.copyOf(original, updated => {
          updated.currentQuestion = questionOrderArray[next];
          updated.view = 0;
        })
      );
      setIsActive(!isActive);
    }
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;

    setTimer(value);
    localStorage.setItem("timer", value);
  }

  function validate() {
    if (!/^[0-9]*$/.test(time)) {
      setError("Enter only a number");
      return false;
    }
    setError("");
    return true;
  }
  //Start the quiz + add first question in + update view to 0
  async function startQuiz(questionOrder) {
    if (validate()) {
      setIsActive(!isActive);
      const questionOrderArray = JSON.parse(questionOrder);
      if (questionOrderArray.length !== 0) {
        const original = await DataStore.query(Quiz, adminGameCode);
        console.log(questionOrderArray);
        await DataStore.save(
          Quiz.copyOf(original, updated => {
            updated.started = true;
            updated.currentQuestion = questionOrderArray[0];
            updated.view = 0;
            updated.questionTime = parseInt(time);
          })
        );
      }
    }
  }

  function onStop(state) {
    if (state) {
      stopQuiz();
    }

    handleModalClose();
  }
  async function stopQuiz() {
    setSeconds(0);
    localStorage.setItem("seconds", 0);
    setIsActive(false);

    const original = await DataStore.query(Quiz, adminGameCode);

    await DataStore.save(
      Quiz.copyOf(original, updated => {
        updated.started = false;
      })
    );
  }

  async function changeScreen(chosenView) {
    const original = await DataStore.query(Quiz, adminGameCode);

    await DataStore.save(
      Quiz.copyOf(original, updated => {
        updated.view = chosenView;
      })
    );
  }

  function showImage(question) {
    console.log(question);
    if (question.imageFromS3 && currentQuestion.image !== "") {
      return (
        <S3Image
          imgKey={question.image}
          theme={{
            photoImg: { maxWidth: "250px", maxHeight: "250px" }
          }}
        />
      );
    } else {
      return <Image src={question.image} className="imageQuestion" fluid />;
    }
  }

  function showQuizControl() {
    if (totalQuestions === 0) {
      return (
        <Card.Body>
          <Card.Title>There are no questions yet!</Card.Title>
        </Card.Body>
      );
    }

    return (
      <Card.Body>
        <Card.Title>Kwizz control</Card.Title>

        {!quiz.started && (
          <Form.Group controlId="timer">
            {error.length > 0 && (
              <Alert size="sm" variant="danger">
                {error}
              </Alert>
            )}

            <Form.Label>Set seconds per question</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              name="name"
              value={time}
              width="20px"
              onChange={handleInputChange}
            />
          </Form.Group>
        )}
        <div className="controlButtons">
          {!quiz.started ? (
            <Button
              onClick={() => {
                startQuiz(quiz.questionOrder);
              }}
              variant="outline-success"
              className="controlStart"
            >
              Start kwizz
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleModalShow();
              }}
              variant="outline-danger"
              className="controlStart"
            >
              Stop quiz
            </Button>
          )}
          {!quiz.started && (
            <Button
              onClick={() => {
                handleResetModalShow();
              }}
              className="controlReset"
              variant="outline-danger"
            >
              Reset
            </Button>
          )}
          {seconds === 0 && quiz.started && quiz.view !== 3 && (
            <Button
              onClick={() => {
                processNextQuestion(quiz.currentQuestion, quiz.questionOrder);
              }}
              className="controlNext"
              variant="success"
            >
              Next question
            </Button>
          )}
        </div>
      </Card.Body>
    );
  }

  return (
    <AmplifyAuthenticator>
      <div className="signout">
        {" "}
        <AmplifySignOut />
      </div>
      <Layout>
        <div className="App">
          <Breadcrumb>
            <Breadcrumb.Item href="/admin">Admin Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Run Kwizz</Breadcrumb.Item>
          </Breadcrumb>

          <Card className="gamersView">
            <Card.Body>
              <Card.Title>What your gamers see now:</Card.Title>

              {!quiz.started ? (
                <div className="startgame">
                  We will soon start with the most exciting game ever!
                </div>
              ) : (
                <div>
                  {quiz.view === 0 && (
                    <div>
                      {currentQuestion.category !== null && (
                        <div className="category">
                          Category: {currentQuestion.category}
                        </div>
                      )}
                      <Row>
                        <Col>
                          <div>
                            <span className="question">
                              {currentQuestion.question}
                            </span>

                            <li>{currentQuestion.answerOne}</li>
                            <li>{currentQuestion.answerTwo}</li>
                            <li>{currentQuestion.answerThree}</li>
                            <li>{currentQuestion.answerFour}</li>
                          </div>
                        </Col>
                        <Col>
                          {currentQuestion.youtube !== null && (
                            <div className="videoQuestion">
                              <Video
                                videoSrcURL={currentQuestion.youtube}
                                videoTitle=""
                              />
                            </div>
                          )}

                          {(currentQuestion.image !== null ||
                            currentQuestion.image !== "" ||
                            typeof currentQuestion.image !== "undefined") && (
                            <div className="imageQuestion">
                              {showImage(currentQuestion)}
                            </div>
                          )}
                        </Col>
                      </Row>
                    </div>
                  )}
                  {quiz.view === 1 && (
                    <div className="result">
                      The right answer is: {rightAnswer}
                    </div>
                  )}
                  {quiz.view === 2 && (
                    <div>
                      <p className="top">TOP 5</p>
                      <Score list={topList} />
                    </div>
                  )}
                  {quiz.view === 3 && (
                    <div>
                      <p className="top">END RESULT</p>
                      <Score list={topList} />
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>

          <Row>
            <Col>
              <Card style={{ height: "100%", width: "100%" }}>
                {showQuizControl()}
              </Card>
            </Col>

            <Col>
              {" "}
              <Card style={{ height: "100%", width: "100%" }}>
                <Card.Body>
                  <Card.Title>Timer</Card.Title>
                  <Card.Text className="indicator">{seconds}s</Card.Text>
                  {quiz.started && (
                    <div>
                      <Card.Title>Question</Card.Title>
                      <Card.Text className="indicator">
                        {questionIndex} / {totalQuestions}{" "}
                      </Card.Text>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={{ height: "100%", width: "100%" }}>
                <Card.Body>
                  <Card.Title>Total participants</Card.Title>
                  <Card.Text className="indicator">
                    {subscribers.length}
                  </Card.Text>
                  {quiz.started && (
                    <div>
                      <Card.Title>Total responses</Card.Title>
                      <Card.Text className="indicator">{responses}</Card.Text>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Modal show={stopModal}>
            <Modal.Header>
              <Modal.Title>Stop kwizz</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to stop the kwizz?</Modal.Body>
            <Modal.Body>
              Please delete the kwizz when finished and not want to run it
              again! Your data will be deleted so we can keep this kwizz free
              for everyone.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => onStop(true)}>
                Yes
              </Button>
              <Button variant="success" onClick={() => onStop(false)}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={resetModal}>
            <Modal.Header>
              <Modal.Title>
                Are you sure you want to reset the quiz?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              All <b>subscribers</b> and <b>responses</b> of this game will be
              deleted. After that you can use this game again. Subscribers need
              to log in again.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => resetQuiz()}>
                Yes
              </Button>
              <Button variant="success" onClick={() => handleResetModalClose()}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Layout>
    </AmplifyAuthenticator>
  );
}

export default AdminPage;
