// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Quiz, Questions, QuestionsDB, Subscribers, Responses, Languages } = initSchema(schema);

export {
  Quiz,
  Questions,
  QuestionsDB,
  Subscribers,
  Responses,
  Languages
};