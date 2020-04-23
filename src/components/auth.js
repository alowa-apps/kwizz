import { DataStore } from "@aws-amplify/datastore";
import { Subscribers } from "../models/";

async function saveSubscriber(name, changePath) {
  await DataStore.save(
    new Subscribers({
      name: name,
      score: 0,
      type: "set",
      version: 0,
      quizID: localStorage.getItem("gamecode")
    })
  )
    .then(data => {
      const subscriber = data.id;
      localStorage.setItem("subscriber", subscriber);

      changePath("game");
    })
    .catch(err => console.log(err));
}

function Auth(props) {
  const name = props.name;
  saveSubscriber(name, props.changePath);

  return null;
}

export default Auth;
