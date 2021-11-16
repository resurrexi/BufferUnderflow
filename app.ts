import Question from './entities/Question'
import Answer from './entities/Answer'
import Image from './entities/Image'
import User from './entities/User'

const user1 = new User('Wonda', User.Permission.Normal);
const user2 = new User('Carlos', User.Permission.Normal);
const admin = new User('Danny', User.Permission.Admin);

const question = new Question(
  user1,
  'How can you convert any value to a boolean in JS?',
  [new Image('Example', Image.Format.PNG, 'url.com/fake.png')]
)

const answers = [
  new Answer(
    user2,
    question,
    'Use two logical NOT operators: !!value'
  ),
  new Answer(
    admin,
    question,
    'Use the Boolean constructor: Boolean(value)'
  )
]

question.setAnswer(answers[0].getId(), user1); // OK

try {
  // Error: User must be an admin or the author of the question
  question.setAnswer(answers[1].getId(), user2);
} catch (e) { }

try {
  // Error: Answer not found. Double check the answer ID
  question.setAnswer('randomId', admin);
} catch (e) { }

question.setAnswer(answers[1].getId(), admin); // OK

const openingLine = '~~~~~~~~~ BufferUnderflow ~~~~~~~~~';
const questionSummary = question.getSummary();
const answerSummaries = answers.map(a => a.getSummary());

const ui = [openingLine, questionSummary, ...answerSummaries]
  .join(`\n\n${'='.repeat(50)}\n\n`);

console.log(ui);
