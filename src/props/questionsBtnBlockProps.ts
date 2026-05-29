import type { AnsweredQuestion } from "../types/answeredQuestion.type";
import type { Question } from "../types/question.type";

export interface QuestionsBtnBlockProps {
    questions: Question[];
    currentQuestion: Question;
    questionsBlockScrollPosition: number;
    answeredQuestions: AnsweredQuestion[];
    selectQuestion: (questionId: number) => void;
    questionsBlockRef: React.RefObject<HTMLDivElement | null>;
    questionsScrollBlockRef: React.RefObject<HTMLDivElement | null>;
}
