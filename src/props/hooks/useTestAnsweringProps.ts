import type { Question } from "../../types/question.type";

export interface UseTestAnsweringProps {
    testId?: string;
    mode: "test" | "mistakes";
    currentQuestion?: Question;
    questionsLength: number;
}
