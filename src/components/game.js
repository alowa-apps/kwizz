import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { DataStore } from "@aws-amplify/datastore";
import { Quiz, Subscribers } from "../models/";
import Questions from "./questions";
import { Button } from "react-bootstrap";
import awsConfig from "../aws-exports";
DataStore.configure(awsConfig);

function App(props) {
  const [subscribers, setSubscribers] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  async function listSubscribers() {
    const subscribers = await DataStore.query(Subscribers, c =>
      c.quizID("eq", localStorage.getItem("gamecode"))
    );

    setSubscribers(subscribers);
  }

  async function listQuiz() {
    const quiz = await DataStore.query(Quiz, c =>
      c.id("eq", localStorage.getItem("gamecode"))
    );

    const quizdata = quiz[0];
    console.log(quizdata);
    if (quizdata.view === 0) {
      setIsActive(true);
      setSeconds(quizdata.questionTime);
    }
    setQuiz(quizdata);
  }

  const StartGame = () => {
    return (
      <div className="startgame">
        We will soon start with the most exciting game ever!
      </div>
    );
  };

  useEffect(() => {
    listQuiz();
    listSubscribers();
    const gameQuiz = DataStore.observe(
      Quiz,
      localStorage.getItem("gamecode")
    ).subscribe(() => {
      listQuiz();
    });

    const subscription = DataStore.observe(Subscribers).subscribe(() => {
      listSubscribers();
    });

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 1) {
          clearInterval(interval);
        } else {
          setSeconds(seconds => seconds - 1);
        }
      }, 1000);
    }

    return () => {
      subscription.unsubscribe();
      gameQuiz.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Button onClick={props.signout}>Signout</Button>
      <Layout quizTitle={quiz}>
        <div className="App">
          <header className="App-header">
            {quiz.started && quiz.view === 0 && (
              <div className="quizTimer">
                <span className="total">{seconds}</span>
                <span> seconds</span>
              </div>
            )}
            <div className="subscribers">
              <span className="total">{subscribers.length}</span>
              <span> Participants</span>
            </div>
          </header>
          {quiz.started && (
            <Questions
              gamecode={localStorage.getItem("gamecode")}
              subscriber={localStorage.getItem("subscriber")}
            />
          )}
          {!quiz.started && <StartGame />}
        </div>
      </Layout>
    </div>
  );
}

export default App;

/*


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerActive: false,
      seconds: 0,
      subscribers: [],
      quiz: []
    };

    this.listSubscribers = this.listSubscribers.bind(this);
    this.listQuiz = this.listQuiz.bind(this);
  }

  setTimer() {
    if (this.state.timerActive) {
      const seconds = this.state.seconds;
      if (seconds === 1) {
        clearInterval(this.interval);
      } else {
        this.setState({ seconds: seconds - 1 });
      }
    }
  }

  componentDidMount() {
    console.log("mounted");

    this.interval = setInterval(() => {
      this.setTimer();
    }, 1000);

    this.gameQuiz = DataStore.observe(Quiz).subscribe(() => {
      console.log("komt ie dan game.js");
      this.listQuiz();
    });

    // this.subscription = DataStore.observe(Subscribers).subscribe(() => {
    //   this.listSubscribers();
    // });

    console.log(this.state.timerActive);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.subscription.unsubscribe();
    this.gameQuiz.unsubscribe();
  }

  async listSubscribers() {
    console.log("aaa");
    const subscribers = await DataStore.query(Subscribers, c =>
      c.quizID("eq", localStorage.getItem("gamecode"))
    );

    console.log(subscribers);

    this.setState({ subscribers: subscribers });
  }

  async listQuiz() {
    console.log("bbb");
    const quiz = await DataStore.query(Quiz, c =>
      c.id("eq", localStorage.getItem("gamecode"))
    );

    const quizdata = quiz[0];

    console.log(quiz);

    if (quizdata.view === 0) {
      this.setState({
        timerActive: true,
        seconds: quizdata.questionTime,
        quiz: quizdata
      });
    }

    this.setState({ quiz: quizdata });
  }

  startGame = () => {
    return (
      <div className="startgame">
        We will soon start with the most exciting game ever!
      </div>
    );
  };

  render() {
    const { quiz, seconds, subscribers } = this.state;
    const gamecode = localStorage.getItem("gamecode");
    const subscriber = localStorage.getItem("subscriber");

    const StartGame = this.startGame;

    return (
      <div>
        <Button onClick={this.props.signout}>Signout</Button>

        <Layout quizTitle={quiz}>
          <div className="App">
            <header className="App-header">
              {quiz.started && quiz.view === 0 && (
                <div className="quizTimer">
                  <span className="total">{seconds}</span>
                  <span> seconds</span>
                </div>
              )}
              <div className="subscribers">
                <span className="total">{subscribers.length}</span>
                <span> Participants</span>
              </div>
            </header>
            {quiz.started && (
              <Questions gamecode={gamecode} subscriber={subscriber} />
            )}
            {!quiz.started && <StartGame />}
          </div>
        </Layout>
      </div>
    );
  }
}

export default Game;

/*

function App({ location }) {
  const [subscribers, setSubscribers] = useState([]);
  const [gamecode, setGamecode] = useState("");
  const [subscriber, setSubscriber] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  v;

  const StartGame = () => {
    return (
      <div className="startgame">
        We will soon start with the most exciting game ever!
      </div>
    );
  };

  useEffect(() => {
    if (location.state !== null) {
      localStorage.setItem("gamecode", location.state.gamecode);
      localStorage.setItem("subscriber", location.state.subscriber);
      setGamecode(location.state.gamecode);
      setSubscriber(location.state.subscriber);
    } else if (
      localStorage.getItem("gamecode") === null &&
      localStorage.getItem("subscriber") === null
    ) {
      //navigate("/");
    } else {
      setGamecode(localStorage.getItem("gamecode"));
      setSubscriber(localStorage.getItem("subscriber"));
    }

    const gameQuiz = DataStore.observe(Quiz).subscribe(() => {
      listQuiz();
    });

    const subscription = DataStore.observe(Subscribers).subscribe(() => {
      listSubscribers();
    });

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 1) {
          clearInterval(interval);
        } else {
          setSeconds(seconds => seconds - 1);
        }
      }, 1000);
    }

    return () => {
      subscription.unsubscribe();
      gameQuiz.unsubscribe();
      clearInterval(interval);
    };
  }, [isActive, seconds, quiz, subscribers]);

  return (
    <Layout quizTitle={quiz}>
      <div className="App">
        <header className="App-header">
          {quiz.started && quiz.view === 0 && (
            <div className="quizTimer">
              <span className="total">{seconds}</span>
              <span> seconds</span>
            </div>
          )}
          <div className="subscribers">
            <span className="total">{subscribers.length}</span>
            <span> Participants</span>
          </div>
        </header>
        {quiz.started && (
          <Questions gamecode={gamecode} subscriber={subscriber} />
        )}
        {!quiz.started && <StartGame />}
      </div>
    </Layout>
  );
}


*/
