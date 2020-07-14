/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncQuizzes = /* GraphQL */ `
  query SyncQuizzes(
    $filter: ModelQuizFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncQuizzes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getQuiz = /* GraphQL */ `
  query GetQuiz($id: ID!) {
    getQuiz(id: $id) {
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
export const listQuizs = /* GraphQL */ `
  query ListQuizs(
    $filter: ModelQuizFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuizs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncQuestions = /* GraphQL */ `
  query SyncQuestions(
    $filter: ModelQuestionsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncQuestions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getQuestions = /* GraphQL */ `
  query GetQuestions($id: ID!) {
    getQuestions(id: $id) {
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
export const listQuestionss = /* GraphQL */ `
  query ListQuestionss(
    $filter: ModelQuestionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncQuestionsDbs = /* GraphQL */ `
  query SyncQuestionsDbs(
    $filter: ModelQuestionsDBFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncQuestionsDBS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getQuestionsDb = /* GraphQL */ `
  query GetQuestionsDb($id: ID!) {
    getQuestionsDB(id: $id) {
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
export const listQuestionsDBs = /* GraphQL */ `
  query ListQuestionsDBs(
    $filter: ModelQuestionsDBFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionsDBs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSubscribers = /* GraphQL */ `
  query SyncSubscribers(
    $filter: ModelSubscribersFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSubscribers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getSubscribers = /* GraphQL */ `
  query GetSubscribers($id: ID!) {
    getSubscribers(id: $id) {
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
export const listSubscriberss = /* GraphQL */ `
  query ListSubscriberss(
    $filter: ModelSubscribersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriberss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncResponses = /* GraphQL */ `
  query SyncResponses(
    $filter: ModelResponsesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncResponses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getResponses = /* GraphQL */ `
  query GetResponses($id: ID!) {
    getResponses(id: $id) {
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
export const listResponsess = /* GraphQL */ `
  query ListResponsess(
    $filter: ModelResponsesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResponsess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncLanguages = /* GraphQL */ `
  query SyncLanguages(
    $filter: ModelLanguagesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLanguages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        code
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLanguages = /* GraphQL */ `
  query GetLanguages($id: ID!) {
    getLanguages(id: $id) {
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
export const listLanguagess = /* GraphQL */ `
  query ListLanguagess(
    $filter: ModelLanguagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLanguagess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        code
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLangByCode = /* GraphQL */ `
  query GetLangByCode(
    $type: String
    $code: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLanguagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getLangByCode(
      type: $type
      code: $code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        code
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
