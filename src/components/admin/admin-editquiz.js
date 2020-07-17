import React, { useEffect, useState } from "react";

import Layout from "../layoutAdmin";
import { DataStore } from "@aws-amplify/datastore";
import { Questions, Quiz, QuestionsDB } from "../../models/";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Storage from "@aws-amplify/storage";
import arrayMove from "array-move";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Link, useHistory } from "react-router-dom";
import { Card } from "./card";

function AdminEditQuizPage({ location }) {
  let history = useHistory();

  if (typeof history.location.state !== "undefined") {
    const quizID = history.location.state.quizID;
    localStorage.setItem("adminGameCode-editquiz", quizID);
  }

  const adminGameCode = localStorage.getItem("adminGameCode-editquiz");
  const [questions, setQuestions] = useState([]);
  const [questionOrder, setQuestionOrder] = useState([]);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedID, setSelectedID] = useState();

  const handleDeleteModalClose = () => setDeleteModalShow(false);

  const handleDeleteModalShow = id => {
    setDeleteModalShow(true);
    setSelectedID(id);
  };

  function addQuestion(id) {
    history.push({
      pathname: "/edit-question",
      state: {
        questionId: 0,
        status: "add"
      }
    });
  }

  async function onDelete() {
    const quiz = await DataStore.query(
      Quiz,
      localStorage.getItem("adminGameCode-editquiz")
    );

    let order = [];
    order = JSON.parse(quiz.questionOrder);

    var index = order.indexOf(selectedID);

    if (index !== -1) {
      order.splice(index, 1);
    }

    const todelete = await DataStore.query(Questions, selectedID);

    if (todelete.image !== "" || typeof todelete.image !== "undefined") {
      Storage.remove(todelete.image); // remove from 3s bucket
    }
    DataStore.delete(todelete);

    const todeleteDB = await DataStore.query(QuestionsDB, c =>
      c.relatedQuestion("eq", selectedID)
    );

    if (todeleteDB.length > 0) {
      DataStore.delete(todeleteDB[0]);
    }

    let curQuestion = null;
    if (order.length > 0) {
      curQuestion = order[0];
    }

    await DataStore.save(
      Questions.copyOf(quiz, updated => {
        updated.questionOrder = JSON.stringify(order);
        updated.currentQuestion = curQuestion;
      })
    );

    // If there are not questions more, set the array to the init value
    if (order.length === 0) {
      setQuestions([]);
    }

    //reset ID and close modal
    setSelectedID("");
    handleDeleteModalClose();
  }

  async function listQuestions(setQuestions) {
    const quiz = await DataStore.query(
      Quiz,
      localStorage.getItem("adminGameCode-editquiz")
    );

    console.log(quiz);
    const questionOrder = JSON.parse(quiz.questionOrder);
    setQuestionOrder(questionOrder);
    let questions = [];
    if (questionOrder !== null || questionOrder !== "[]") {
      for (let i = 0; i < questionOrder.length; i++) {
        const question = await DataStore.query(Questions, questionOrder[i]);
        if (typeof question !== "undefined") {
          questions.push(question);
        }
      }
    }
    setQuestions(questions);
  }

  useEffect(() => {
    const question = DataStore.observe(Questions).subscribe(msg => {
      listQuestions(setQuestions);
    });

    listQuestions(setQuestions);

    return () => {
      question.unsubscribe();
    };
  }, []);

  function NoQuestions() {
    return <div> There are no question </div>;
  }

  async function moveCard(dragIndex, hoverIndex) {
    var toBeChangedArray = [];
    toBeChangedArray = questionOrder;

    arrayMove.mutate(toBeChangedArray, dragIndex, hoverIndex);

    const original = await DataStore.query(Quiz, adminGameCode);
    await DataStore.save(
      Quiz.copyOf(original, updated => {
        updated.questionOrder = JSON.stringify(toBeChangedArray);
      })
    );
    listQuestions(setQuestions);
  }

  function ShowQuestions() {
    return questions.map((item, i) => {
      return (
        <Row key={i} className="editRow">
          <Col>
            <Card
              key={item.id}
              index={i}
              id={item.id}
              moveCard={moveCard}
              title={questions[i].question}
              editQuestion={{
                pathname: "/edit-question",
                state: { questionId: questions[i].id, status: "edit" }
              }}
              deleteQuestion={() => handleDeleteModalShow(questions[i].id)}
            />
          </Col>
        </Row>
      );
    });
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <AmplifyAuthenticator>
        <div className="signout">
          {" "}
          <AmplifySignOut />
        </div>

        <Layout>
          <div className="App">
            <Link to="/admin">
              <Button className="backButton" variant="secondary">
                Back
              </Button>
            </Link>
            <br />
            <p>{questions.length} Questions</p>
            <div className="addEditButtons">
              <Button
                onClick={() => {
                  addQuestion();
                }}
                variant="primary"
                className="addQuestion"
              >
                Add Question
              </Button>
              or
              <Link
                to={{
                  pathname: "/library"
                }}
              >
                <Button variant="primary" className="addQuestionLibrary">
                  Find in library
                </Button>
              </Link>
            </div>
            {typeof questions === "undefined" ||
            questions.length === 0 ||
            typeof questions[0] === "undefined" ? (
              <NoQuestions />
            ) : (
              <ShowQuestions />
            )}
            <br />
          </div>
          <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this question?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => onDelete()}>
                Delete quiz
              </Button>
            </Modal.Footer>
          </Modal>
        </Layout>
      </AmplifyAuthenticator>
    </DndProvider>
  );
}

export default AdminEditQuizPage;
