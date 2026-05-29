import type { AnsweredQuestion } from "../../types/answeredQuestion.type";

export interface SaveTestProgressProps {
    testId: string;
    answeredQuestions: AnsweredQuestion[];
}
