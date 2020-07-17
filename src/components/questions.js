import React from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Questions, Quiz, Subscribers, Responses } from "../models/";
import { Button, Image } from "react-bootstrap";
import Score from "../components/score";
import Video from "../components/video";
import Failure from "../images/failure.gif";
import Right from "../images/right.gif";
import Winner from "../images/winner.gif";
import { S3Image } from "aws-amplify-react";
import awsConfig from "../aws-exports";

export default class QuestionApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriber: localStorage.getItem("subscriber"),
      question: {},
      quiz: {},
      disabled: false,
      timer: 0,
      rightAnswer: "",
      view: 0,
      topList: [],
      answerState: false
    };
    this.listQuiz();

    this.setAnswer = this.setAnswer.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.showQuestions = this.showQuestions.bind(this);
  }

  async listQuiz() {
    const quiz = await DataStore.query(Quiz, c =>
      c.id("eq", localStorage.getItem("gamecode"))
    );
    const currentQuestion = quiz[0].currentQuestion;

    if (quiz[0].started) {
      if (quiz[0].view === 0 && localStorage.getItem("disabled") === "true") {
        this.setState({ disabled: true });
      } else {
        localStorage.setItem("disabled", false);
        this.setState({ disabled: false });
      }

      const question = await DataStore.query(Questions, c =>
        c.id("eq", currentQuestion)
      );
      const returnedQuestion = question[0];

      // set right answer in the state
      let rightAnswer = "";
      if (
        returnedQuestion.answerOne !== "" &&
        returnedQuestion.answerOneCorrect
      ) {
        rightAnswer = returnedQuestion.answerOne;
      }
      if (
        returnedQuestion.answerTwo !== "" &&
        returnedQuestion.answerTwoCorrect
      ) {
        rightAnswer = returnedQuestion.answerTwo;
      }
      if (
        returnedQuestion.answerThree !== "" &&
        returnedQuestion.answerThreeCorrect
      ) {
        rightAnswer = returnedQuestion.answerThree;
      }
      if (
        returnedQuestion.answerFour !== "" &&
        returnedQuestion.answerFourCorrect
      ) {
        rightAnswer = returnedQuestion.answerFour;
      }

      const questionArray = [];
      questionArray.push(returnedQuestion);

      if (quiz[0].view === 2 || quiz[0].view === 3) {
        const subscribers = await DataStore.query(Subscribers, c =>
          c.quizID("eq", localStorage.getItem("gamecode"))
        );

        const subscriberList = subscribers.sort(function(a, b) {
          return b.score - a.score;
        });

        this.setState({ topList: subscriberList, answerState: false });
      }

      this.setState({
        quiz: quiz[0],
        view: quiz[0].view,
        question: questionArray[0],
        timer: Date.now(),
        rightAnswer,
        disabled: false
      });
    }
  }

  async setAnswer(status) {
    localStorage.setItem("disabled", true);
    this.setState({ disabled: true });
    let score = 0;
    if (status) {
      const maxScore = this.state.quiz.questionTime;
      score = maxScore - Math.round((Date.now() - this.state.timer) / 1000);
      this.setState({ answerState: true });
    } else {
      this.setState({ answerState: false });
    }

    const original = await DataStore.query(
      Subscribers,
      localStorage.getItem("subscriber")
    );

    score = score + original.score;
    await DataStore.save(
      Subscribers.copyOf(original, updated => {
        updated.score = score;
      })
    );

    await DataStore.save(
      new Responses({
        quiz: localStorage.getItem("gamecode"),
        question: this.state.question.id,
        subscriber: this.state.subscriber
      })
    );
  }

  componentDidMount() {
    this.quiz = DataStore.observe(
      Quiz,
      localStorage.getItem("gamecode")
    ).subscribe(async () => {
      await this.listQuiz();
    });
  }

  componentWillUnmount() {
    this.quiz.unsubscribe();
  }

  showQuestions() {
    const question = this.state.question;

    let disabled = this.state.disabled;
    if (localStorage.getItem("disabled") === "true") {
      disabled = true;
    }

    const image = question.image;
    let imageSlice = "";
    if (image !== null && typeof image !== "undefined") {
      imageSlice = image.slice(0, 4);
    }

    return (
      <div>
        <span className="question">{question.question}</span>
        {question.category !== null && (
          <div className="category">Category: {question.category}</div>
        )}

        <div className="answer">
          <Button
            variant="primary"
            block
            onClick={() => this.setAnswer(question.answerOneCorrect)}
            disabled={disabled}
          >
            {question.answerOne}
          </Button>
        </div>
        <div className="answer">
          <Button
            variant="success"
            block
            onClick={() => this.setAnswer(question.answerTwoCorrect)}
            disabled={disabled}
          >
            {question.answerTwo}
          </Button>
        </div>
        <div className="answer">
          <Button
            variant="warning"
            block
            onClick={() => this.setAnswer(question.answerThreeCorrect)}
            disabled={disabled}
          >
            {question.answerThree}
          </Button>
        </div>
        <div className="answer">
          <Button
            variant="danger"
            block
            onClick={() => this.setAnswer(question.answerFourCorrect)}
            disabled={disabled}
          >
            {question.answerFour}
          </Button>
        </div>

        {question.youtube !== null && (
          <div className="videoQuestion">
            <Video videoSrcURL={question.youtube} videoTitle="" />
          </div>
        )}
        {(question.image !== null || question.image !== "") && (
          <div className="imageQuestionDiv">
            {imageSlice !== "http" ? (
              <S3Image
                imgKey={image}
                theme={{
                  photoImg: { maxWidth: "400px", maxHeight: "400px" }
                }}
              />
            ) : (
              <Image src={question.image} className="imageQuestion" fluid />
            )}
          </div>
        )}
      </div>
    );
  }

  showAnswer() {
    const question = this.state.question;
    return (
      <div>
        <span className="question">{question.question}</span>

        {this.state.answerState && (
          <div className="gif">
            <div className="result">
              Yeah! The right answer is: {this.state.rightAnswer}
            </div>
            <img src={Right} width="300px" alt="right answer" />
          </div>
        )}
        {!this.state.answerState && (
          <div className="gif">
            <div className="resultfalse">
              Failed! The right answer is: {this.state.rightAnswer}
            </div>
            <img src={Failure} width="300px" alt="wrong answer" />
          </div>
        )}
      </div>
    );
  }

  render() {
    let content = "There are no questions";
    const quiz = this.state.quiz;

    if (quiz.view === 0) {
      content = this.showQuestions();
    }
    if (quiz.view === 1) {
      content = this.showAnswer();
    }
    if (quiz.view === 2) {
      content = (
        <div>
          <p className="top">TOP 5</p>
          <Score list={this.state.topList} />
        </div>
      );
    }
    if (quiz.view === 3) {
      content = (
        <div className="gif">
          <img src={Winner} width="300px" alt="winner" />
          <p className="top">END RESULT</p>
          <Score list={this.state.topList} />
        </div>
      );
    }

    return <div>{content}</div>;
  }
}
