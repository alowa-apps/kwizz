/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuiz = /* GraphQL */ `
  subscription OnCreateQuiz {
    onCreateQuiz {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateQuiz = /* GraphQL */ `
  subscription OnUpdateQuiz {
    onUpdateQuiz {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteQuiz = /* GraphQL */ `
  subscription OnDeleteQuiz {
    onDeleteQuiz {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateQuestions = /* GraphQL */ `
  subscription OnCreateQuestions {
    onCreateQuestions {
      id
      image
      imageFromS3
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateQuestions = /* GraphQL */ `
  subscription OnUpdateQuestions {
    onUpdateQuestions {
      id
      image
      imageFromS3
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteQuestions = /* GraphQL */ `
  subscription OnDeleteQuestions {
    onDeleteQuestions {
      id
      image
      imageFromS3
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateQuestionsDb = /* GraphQL */ `
  subscription OnCreateQuestionsDb {
    onCreateQuestionsDB {
      id
      image
      imageFromS3
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateQuestionsDb = /* GraphQL */ `
  subscription OnUpdateQuestionsDb {
    onUpdateQuestionsDB {
      id
      image
      imageFromS3
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteQuestionsDb = /* GraphQL */ `
  subscription OnDeleteQuestionsDb {
    onDeleteQuestionsDB {
      id
      image
      imageFromS3
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
      createdAt
      updatedAt
    }
  }
`;
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
    }
  }
`;
