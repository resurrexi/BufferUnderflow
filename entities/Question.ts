import Answer from './Answer'
import Attachment from './Attachment'
import Unique, { UniqueId } from './Unique'
import Summary from './Summary'
import User from './User'
import getUniqueId from '../utils/getUniqueId'

class Question implements Unique, Summary {
  private id: UniqueId;
  private answers: Answer[];
  private attachments: Attachment[];
  private text!: string; // definite assignment assertion modifier
  private author: User;
  private chosenAnswer?: Answer;

  constructor(author: User, text: string, attachments: Attachment[] = []) {
    this.author = author;
    this.attachments = attachments;
    this.answers = [];
    this.id = getUniqueId();

    this.setText(text); // set 'text' outside constructor, hence modifier
  }

  getId(): UniqueId {
    return this.id;
  }

  setText(text: string) {
    this.text = text;
  }

  addAttachment(attachment: Attachment) {
    this.attachments.push(attachment);
  }

  addAnswer(answer: Answer) {
    this.answers.push(answer);
  }

  setAnswer(id: UniqueId, user: User) {
    const canAnswer = user.canAnswerQuestionOpenedBy(this.author);

    if (!canAnswer) {
      throw "User must be an admin or owner of question";
    }

    const answer = this.answers.find(a => a.getId() === id);

    if (!answer) {
      throw "Answer not found. Double check the answer ID";
    }

    this.chosenAnswer = answer;
  }

  getSummary(prefix: string = ''): string {
    const author = this.author.getSummary(' - ');
    const maxTextLength = 40;

    const hasChosenAnswerText = this.chosenAnswer
      ? `Yes (${this.chosenAnswer.getId()})`
      : 'No';

    const textSnippet = this.text.length >= maxTextLength
      ? `${this.text.substring(0, maxTextLength - 3)}...`
      : this.text;

    const lines = [
      `Question: ${textSnippet}`,
      `Attachments: ${this.attachments.length}`,
      `Author: ${author}`,
      `Answers: ${this.answers.length}`,
      `Has an answer been chosen? ${hasChosenAnswerText}`
    ]

    return lines.map(line => `${prefix}${line}`).join('\n');
  }
}

export default Question;
