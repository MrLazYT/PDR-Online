import type { Answer } from "../types/answer.type";
import type { AnsweredQuestion } from "../types/answeredQuestion.type";
import type { Question } from "../types/question.type";

export interface AnswerBtnProps {
    answer: Answer;
    answeredQuestions: AnsweredQuestion[];
    currentQuestion: Question;
    answerQuestion: () => void;
}
