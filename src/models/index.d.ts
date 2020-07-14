import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Quiz {
  readonly id: string;
  readonly title: string;
  readonly seconds: number;
  readonly currentQuestion?: string;
  readonly questionOrder?: string;
  readonly started?: boolean;
  readonly questionTime?: number;
  readonly view?: number;
  readonly owner: string;
  constructor(init: ModelInit<Quiz>);
  static copyOf(source: Quiz, mutator: (draft: MutableModel<Quiz>) => MutableModel<Quiz> | void): Quiz;
}

export declare class Questions {
  readonly id: string;
  readonly image?: string;
  readonly imageFromS3?: boolean;
  readonly youtube?: string;
  readonly question: string;
  readonly answerOne?: string;
  readonly answerOneCorrect?: boolean;
  readonly answerTwo?: string;
  readonly answerTwoCorrect?: boolean;
  readonly answerThree?: string;
  readonly answerThreeCorrect?: boolean;
  readonly answerFour?: string;
  readonly answerFourCorrect?: boolean;
  readonly quizID: string;
  readonly order?: number;
  readonly public?: boolean;
  readonly fromLibrary?: boolean;
  readonly category?: string;
  constructor(init: ModelInit<Questions>);
  static copyOf(source: Questions, mutator: (draft: MutableModel<Questions>) => MutableModel<Questions> | void): Questions;
}

export declare class QuestionsDB {
  readonly id: string;
  readonly image?: string;
  readonly imageFromS3?: boolean;
  readonly youtube?: string;
  readonly question: string;
  readonly answerOne?: string;
  readonly answerOneCorrect?: boolean;
  readonly answerTwo?: string;
  readonly answerTwoCorrect?: boolean;
  readonly answerThree?: string;
  readonly answerThreeCorrect?: boolean;
  readonly answerFour?: string;
  readonly answerFourCorrect?: boolean;
  readonly relatedQuestion: string;
  readonly public?: boolean;
  readonly category?: string;
  readonly language?: string;
  constructor(init: ModelInit<QuestionsDB>);
  static copyOf(source: QuestionsDB, mutator: (draft: MutableModel<QuestionsDB>) => MutableModel<QuestionsDB> | void): QuestionsDB;
}

export declare class Subscribers {
  readonly id: string;
  readonly type: string;
  readonly score: number;
  readonly quizID: string;
  readonly name: string;
  constructor(init: ModelInit<Subscribers>);
  static copyOf(source: Subscribers, mutator: (draft: MutableModel<Subscribers>) => MutableModel<Subscribers> | void): Subscribers;
}

export declare class Responses {
  readonly id: string;
  readonly quiz: string;
  readonly subscriber: string;
  readonly question: string;
  constructor(init: ModelInit<Responses>);
  static copyOf(source: Responses, mutator: (draft: MutableModel<Responses>) => MutableModel<Responses> | void): Responses;
}

export declare class Languages {
  readonly id: string;
  readonly type: string;
  readonly code: string;
  constructor(init: ModelInit<Languages>);
  static copyOf(source: Languages, mutator: (draft: MutableModel<Languages>) => MutableModel<Languages> | void): Languages;
}