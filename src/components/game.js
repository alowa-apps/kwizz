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
<<<<<<< HEAD
    const result = await DataStore.query(Subscribers, c =>
=======
    const subscribers = await DataStore.query(Subscribers, (c) =>
>>>>>>> 44630a268c43f8bec0a6c221bd795f4a06f7be8e
      c.quizID("eq", localStorage.getItem("gamecode"))
    );

    setSubscribers(result);
  }

  async function listQuiz() {
<<<<<<< HEAD
    const result = await DataStore.query(Quiz, c =>
      c.id("eq", localStorage.getItem("gamecode"))
    );

    const quizdata = result[0];
    if (quizdata.view === 0) {
      setSeconds(quizdata.questionTime);
      setIsActive(true);
=======
    const quiz = await DataStore.query(Quiz, (c) =>
      c.id("eq", localStorage.getItem("gamecode"))
    );

    const quizdata = quiz[0];
    console.log(quizdata);
    if (
      typeof quizdata === "undefined" ||
      typeof quizdata.view === "undefined"
    ) {
>>>>>>> 44630a268c43f8bec0a6c221bd795f4a06f7be8e
    } else {
      if (quizdata.view === 0) {
        setSeconds(quizdata.questionTime);
        setIsActive(true);
      } else {
        setSeconds(0);
        setIsActive(false);
      }
      setQuiz(quizdata);
    }
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
      console.log("quizUpdated");
      listQuiz();
    });
    const subscription = DataStore.observe(Subscribers).subscribe(() => {
      listSubscribers();
    });

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
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
                <span className="total">{seconds > 0 ? seconds : 0}</span>
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
