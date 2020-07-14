/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuiz = /* GraphQL */ `
  mutation CreateQuiz(
    $input: CreateQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    createQuiz(input: $input, condition: $condition) {
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
export const updateQuiz = /* GraphQL */ `
  mutation UpdateQuiz(
    $input: UpdateQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    updateQuiz(input: $input, condition: $condition) {
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
export const deleteQuiz = /* GraphQL */ `
  mutation DeleteQuiz(
    $input: DeleteQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    deleteQuiz(input: $input, condition: $condition) {
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
export const createQuestions = /* GraphQL */ `
  mutation CreateQuestions(
    $input: CreateQuestionsInput!
    $condition: ModelQuestionsConditionInput
  ) {
    createQuestions(input: $input, condition: $condition) {
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
export const updateQuestions = /* GraphQL */ `
  mutation UpdateQuestions(
    $input: UpdateQuestionsInput!
    $condition: ModelQuestionsConditionInput
  ) {
    updateQuestions(input: $input, condition: $condition) {
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
export const deleteQuestions = /* GraphQL */ `
  mutation DeleteQuestions(
    $input: DeleteQuestionsInput!
    $condition: ModelQuestionsConditionInput
  ) {
    deleteQuestions(input: $input, condition: $condition) {
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
export const createQuestionsDb = /* GraphQL */ `
  mutation CreateQuestionsDb(
    $input: CreateQuestionsDBInput!
    $condition: ModelQuestionsDBConditionInput
  ) {
    createQuestionsDB(input: $input, condition: $condition) {
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
export const updateQuestionsDb = /* GraphQL */ `
  mutation UpdateQuestionsDb(
    $input: UpdateQuestionsDBInput!
    $condition: ModelQuestionsDBConditionInput
  ) {
    updateQuestionsDB(input: $input, condition: $condition) {
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
export const deleteQuestionsDb = /* GraphQL */ `
  mutation DeleteQuestionsDb(
    $input: DeleteQuestionsDBInput!
    $condition: ModelQuestionsDBConditionInput
  ) {
    deleteQuestionsDB(input: $input, condition: $condition) {
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
export const createSubscribers = /* GraphQL */ `
  mutation CreateSubscribers(
    $input: CreateSubscribersInput!
    $condition: ModelSubscribersConditionInput
  ) {
    createSubscribers(input: $input, condition: $condition) {
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
export const updateSubscribers = /* GraphQL */ `
  mutation UpdateSubscribers(
    $input: UpdateSubscribersInput!
    $condition: ModelSubscribersConditionInput
  ) {
    updateSubscribers(input: $input, condition: $condition) {
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
export const deleteSubscribers = /* GraphQL */ `
  mutation DeleteSubscribers(
    $input: DeleteSubscribersInput!
    $condition: ModelSubscribersConditionInput
  ) {
    deleteSubscribers(input: $input, condition: $condition) {
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
export const createResponses = /* GraphQL */ `
  mutation CreateResponses(
    $input: CreateResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    createResponses(input: $input, condition: $condition) {
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
export const updateResponses = /* GraphQL */ `
  mutation UpdateResponses(
    $input: UpdateResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    updateResponses(input: $input, condition: $condition) {
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
export const deleteResponses = /* GraphQL */ `
  mutation DeleteResponses(
    $input: DeleteResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    deleteResponses(input: $input, condition: $condition) {
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
export const createLanguages = /* GraphQL */ `
  mutation CreateLanguages(
    $input: CreateLanguagesInput!
    $condition: ModelLanguagesConditionInput
  ) {
    createLanguages(input: $input, condition: $condition) {
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
export const updateLanguages = /* GraphQL */ `
  mutation UpdateLanguages(
    $input: UpdateLanguagesInput!
    $condition: ModelLanguagesConditionInput
  ) {
    updateLanguages(input: $input, condition: $condition) {
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
export const deleteLanguages = /* GraphQL */ `
  mutation DeleteLanguages(
    $input: DeleteLanguagesInput!
    $condition: ModelLanguagesConditionInput
  ) {
    deleteLanguages(input: $input, condition: $condition) {
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
