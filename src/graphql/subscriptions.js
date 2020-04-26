/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubscribers = /* GraphQL */ `
  subscription OnCreateSubscribers {
    onCreateSubscribers {
      id
      type
      score
      quizID
      name
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateSubscribers = /* GraphQL */ `
  subscription OnUpdateSubscribers {
    onUpdateSubscribers {
      id
      type
      score
      quizID
      name
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteSubscribers = /* GraphQL */ `
  subscription OnDeleteSubscribers {
    onDeleteSubscribers {
      id
      type
      score
      quizID
      name
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateResponses = /* GraphQL */ `
  subscription OnCreateResponses {
    onCreateResponses {
      id
      quiz
      subscriber
      question
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateResponses = /* GraphQL */ `
  subscription OnUpdateResponses {
    onUpdateResponses {
      id
      quiz
      subscriber
      question
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteResponses = /* GraphQL */ `
  subscription OnDeleteResponses {
    onDeleteResponses {
      id
      quiz
      subscriber
      question
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateLanguages = /* GraphQL */ `
  subscription OnCreateLanguages {
    onCreateLanguages {
      id
      type
      code
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateLanguages = /* GraphQL */ `
  subscription OnUpdateLanguages {
    onUpdateLanguages {
      id
      type
      code
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteLanguages = /* GraphQL */ `
  subscription OnDeleteLanguages {
    onDeleteLanguages {
      id
      type
      code
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateQuiz = /* GraphQL */ `
  subscription OnCreateQuiz($owner: String!) {
    onCreateQuiz(owner: $owner) {
      id
      title
      seconds
      currentQuestion
      questionOrder
      started
      questionTime
      view
      owner
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateQuiz = /* GraphQL */ `
  subscription OnUpdateQuiz($owner: String!) {
    onUpdateQuiz(owner: $owner) {
      id
      title
      seconds
      currentQuestion
      questionOrder
      started
      questionTime
      view
      owner
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteQuiz = /* GraphQL */ `
  subscription OnDeleteQuiz($owner: String!) {
    onDeleteQuiz(owner: $owner) {
      id
      title
      seconds
      currentQuestion
      questionOrder
      started
      questionTime
      view
      owner
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateQuestions = /* GraphQL */ `
  subscription OnCreateQuestions($owner: String!) {
    onCreateQuestions(owner: $owner) {
      id
      image
      youtube
      question
      answerOne
      answerOneCorrect
      answerTwo
      answerTwoCorrect
      answerThree
      answerThreeCorrect
      answerFour
      answerFourCorrect
      quizID
      order
      public
      fromLibrary
      category
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateQuestions = /* GraphQL */ `
  subscription OnUpdateQuestions($owner: String!) {
    onUpdateQuestions(owner: $owner) {
      id
      image
      youtube
      question
      answerOne
      answerOneCorrect
      answerTwo
      answerTwoCorrect
      answerThree
      answerThreeCorrect
      answerFour
      answerFourCorrect
      quizID
      order
      public
      fromLibrary
      category
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteQuestions = /* GraphQL */ `
  subscription OnDeleteQuestions($owner: String!) {
    onDeleteQuestions(owner: $owner) {
      id
      image
      youtube
      question
      answerOne
      answerOneCorrect
      answerTwo
      answerTwoCorrect
      answerThree
      answerThreeCorrect
      answerFour
      answerFourCorrect
      quizID
      order
      public
      fromLibrary
      category
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateQuestionsDb = /* GraphQL */ `
  subscription OnCreateQuestionsDb($owner: String!) {
    onCreateQuestionsDB(owner: $owner) {
      id
      image
      youtube
      question
      answerOne
      answerOneCorrect
      answerTwo
      answerTwoCorrect
      answerThree
      answerThreeCorrect
      answerFour
      answerFourCorrect
      relatedQuestion
      public
      category
      language
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateQuestionsDb = /* GraphQL */ `
  subscription OnUpdateQuestionsDb($owner: String!) {
    onUpdateQuestionsDB(owner: $owner) {
      id
      image
      youtube
      question
      answerOne
      answerOneCorrect
      answerTwo
      answerTwoCorrect
      answerThree
      answerThreeCorrect
      answerFour
      answerFourCorrect
      relatedQuestion
      public
      category
      language
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteQuestionsDb = /* GraphQL */ `
  subscription OnDeleteQuestionsDb($owner: String!) {
    onDeleteQuestionsDB(owner: $owner) {
      id
      image
      youtube
      question
      answerOne
      answerOneCorrect
      answerTwo
      answerTwoCorrect
      answerThree
      answerThreeCorrect
      answerFour
      answerFourCorrect
      relatedQuestion
      public
      category
      language
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
