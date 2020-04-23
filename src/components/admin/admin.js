import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import Layout from "../layout";
import { DataStore } from "@aws-amplify/datastore";
import { Quiz, Subscribers, Questions, Responses } from "../../models/";
import { Link } from "react-router-dom";
import Amplify, { Hub } from "@aws-amplify/core";

import awsconfig from "../../aws-exports";

import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);
DataStore.configure(awsconfig);

const Auth = Amplify.Auth;

function AdminPage(props) {
  const [quiz, setQuiz] = useState([]);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [toBeDeletedId, setToBeDeletedId] = useState(false);
  const [user, setUser] = useState();

  const handleDeleteModalClose = () => setDeleteModalShow(false);

  function handleDeleteModalShow(id) {
    setToBeDeletedId(id);

    setDeleteModalShow(true);
  }

  async function onCreate() {
    await DataStore.save(
      new Quiz({
        owner: user,
        title: `New quiz`,
        code: Math.floor(Math.random()),
        seconds: 30,
        timestamp: 0,
        started: false,
        questionOrder: "[]"
      })
    );
  }

  async function onDelete() {
    const todelete = await DataStore.query(Quiz, toBeDeletedId);
    DataStore.delete(todelete);

    const deletedSubsribers = await DataStore.query(Subscribers, c =>
      c.quizID("eq", toBeDeletedId)
    );
    if (deletedSubsribers.length > 0) {
      DataStore.delete(deletedSubsribers);
    }

    const deletedQuestions = await DataStore.query(Questions, c =>
      c.quizID("eq", toBeDeletedId)
    );

    if (deletedQuestions.length > 0) {
      DataStore.delete(deletedQuestions[0]);
    }

    const deletedResponses = await DataStore.query(Responses, c =>
      c.quiz("eq", toBeDeletedId)
    );
    if (deletedResponses.length > 0) {
      DataStore.delete(deletedResponses[0]);
    }

    listQuiz(setQuiz);
    handleDeleteModalClose();
    setToBeDeletedId("");
  }

  async function listQuiz(setQuiz) {
    const user = await Auth.currentAuthenticatedUser()
      .then(data => {
        setUser(data.signInUserSession.idToken.payload.sub);
        return data.signInUserSession.idToken.payload.sub;
      })
      .catch(e => console.log("error: ", e));

    const quiz = await DataStore.query(Quiz, c => c.owner("eq", user));
    setQuiz(quiz);
  }

  useEffect(() => {
    const init = DataStore.observe(Quiz).subscribe(Quiz => {
      listQuiz(setQuiz);
    });

    Hub.listen("auth", data => {
      const { payload } = data;
      if (payload.event === "signIn") {
        listQuiz(setQuiz);
      }
    });

    listQuiz(setQuiz);

    return () => {
      init.unsubscribe();
    };
  }, []);

  return (
    <div className="signin">
      <AmplifyAuthenticator>
        <div className="signout">
          {" "}
          <AmplifySignOut />
        </div>

        <Layout>
          <div className="App">
            <Table>
              <thead>
                <tr>
                  <td>Game code</td>
                  <td>Title</td>
                  <td>Started?</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {quiz.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{quiz[i].id.substring(0, 8)}</td>
                      <td>{quiz[i].title}</td>
                      <td>
                        {quiz.started ? (
                          <p>Quiz not started!</p>
                        ) : (
                          <p>Quiz started!</p>
                        )}
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/run-quiz",
                            state: { quizID: quiz[i].id }
                          }}
                        >
                          Run Quiz
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/edit-quiz",
                            state: { quizID: quiz[i].id }
                          }}
                        >
                          Edit Quiz
                        </Link>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteModalShow(quiz[i].id)}
                        >
                          Delete quiz
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Button
              onClick={() => {
                onCreate();
                listQuiz(setQuiz);
              }}
              variant="primary"
            >
              Add Quiz
            </Button>

            <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete quiz</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this quiz?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={() => onDelete()}>
                  Delete quiz
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Layout>
      </AmplifyAuthenticator>
    </div>
  );
}

export default AdminPage;
