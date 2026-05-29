import type { AnsweredQuestion } from "../types/answeredQuestion.type";
import type { Question } from "../types/question.type";

export interface AnswersBtnBlockProps {
    currentQuestion: Question;
    answeredQuestions: AnsweredQuestion[];
    answerQuestion: (answerId: string) => void;
}
