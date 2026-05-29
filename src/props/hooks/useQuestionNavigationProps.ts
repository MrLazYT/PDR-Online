import type { Question } from "../../types/question.type";

export interface UseQuestionNavigationProps {
    questions: Question[];
    currentQuestion: Question | undefined;
    setCurrentQuestion: (question: Question) => void;
    questionTimers: number[];
    setQuestionTimers: (timers: number[]) => void;
    currentQuestionTimer: number;
    setCurrentQuestionTimer: (timer: number) => void;
}
