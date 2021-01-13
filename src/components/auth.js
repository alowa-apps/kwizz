import { DataStore, syncExpression } from "@aws-amplify/datastore";
import {
  Quiz,
  Questions,
  QuestionsDB,
  Subscribers,
  Responses,
  Languages,
} from "../models/";

//import { DataStore, syncExpression } from 'aws-amplify';

async function saveSubscriber(name, changePath) {
  await DataStore.save(
    new Subscribers({
      name: name,
      score: 0,
      type: "set",
      version: 0,
      quizID: localStorage.getItem("gamecode"),
    })
  )
    .then((data) => {
      const subscriber = data.id;
      localStorage.setItem("subscriber", subscriber);

      changePath("game");
    })
    .catch((err) => console.log(err));
}

function Auth(props) {
  console.log("komt hier");

  DataStore.configure({
    syncExpressions: [
      syncExpression(Quiz, () => {
        return (c) => c.id("beginsWith", localStorage.getItem("gamecode"));
      }),
      syncExpression(Questions, () => {
        return (c) => c.quizID("beginsWith", localStorage.getItem("gamecode"));
      }),
      syncExpression(QuestionsDB, () => {
        return (c) => c.id("eq", null);
      }),
      syncExpression(Subscribers, () => {
        return (c) => c.quizID("beginsWith", localStorage.getItem("gamecode"));
      }),
      syncExpression(Responses, () => {
        return (c) => c.quiz("beginsWith", localStorage.getItem("gamecode"));
      }),
      syncExpression(Languages, () => {
        return (c) => c.id("eq", null);
      }),
    ],
  });

  DataStore.start();

  const name = props.name;
  saveSubscriber(name, props.changePath);

  return null;
}

export default Auth;
