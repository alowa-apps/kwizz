import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import Layout from "../layoutAdmin";
import { DataStore } from "@aws-amplify/datastore";
import { Quiz, Subscribers, Questions, Responses } from "../../models/";
import { Link } from "react-router-dom";
import Amplify, { Hub } from "@aws-amplify/core";
import Footer from "../footerAdmin";
import awsconfig from "../../aws-exports";
import Storage from "@aws-amplify/storage";
import { Auth } from "@aws-amplify/auth";

import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);
DataStore.configure(awsconfig);
Auth.configure(awsconfig);

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
        questionOrder: "[]",
      })
    );
  }

  async function onDelete() {
    DataStore.delete(Quiz, (c) => c.id("eq", toBeDeletedId));
    DataStore.delete(Subscribers, (c) => c.quizID("eq", toBeDeletedId));
    DataStore.delete(Responses, (c) => c.quiz("eq", toBeDeletedId));

    const deletedQuestions = await DataStore.query(Questions, (c) =>
      c.quizID("eq", toBeDeletedId)
    );

    if (deletedQuestions.length > 0) {
      deletedQuestions.map((item) => {
        if (item.image !== "" || typeof item.image !== "undefined") {
          Storage.remove(item.image); // remove from 3s bucket
        }
      });
    }

    DataStore.delete(Questions, (c) => c.quizID("eq", toBeDeletedId));

    listQuiz(setQuiz);
    handleDeleteModalClose();
    setToBeDeletedId("");
  }

  async function listQuiz(setQuiz) {
    Auth.currentAuthenticatedUser()
      .then(async (data) => {
        setUser(data.signInUserSession.idToken.payload.sub);
        const userID = data.signInUserSession.idToken.payload.sub;

        const result = await DataStore.query(Quiz, (c) =>
          c.owner("eq", userID)
        );
        setQuiz(result);
      })
      .catch((e) => console.log("error: ", e));
  }

  useEffect(() => {
    Hub.listen("auth", (data) => {
      const { payload } = data;
      if (payload.event === "signIn") {
        listQuiz(setQuiz);
      }
    });

    listQuiz(setQuiz);

    return () => {};
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

                  <td></td>
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

                      <td>
                        <Link
                          to={{
                            pathname: "/run-quiz",
                            state: { quizID: quiz[i].id },
                          }}
                        >
                          Run Kwizz
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/edit-quiz",
                            state: { quizID: quiz[i].id },
                          }}
                        >
                          Edit Kwizz
                        </Link>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteModalShow(quiz[i].id)}
                        >
                          Delete Kwizz
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
              Add Kwizz
            </Button>

            <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete kwizz</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this kwizz? All your data will
                be destroyed, except from the questions in the library!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={() => onDelete()}>
                  Delete kwizz
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Layout>
      </AmplifyAuthenticator>
      <div className="clear"></div>
      <Footer />
    </div>
  );
}

export default AdminPage;
