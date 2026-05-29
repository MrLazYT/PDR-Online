import type { Question } from "../types/question.type";
import type { AnsweredQuestion } from "../types/answeredQuestion.type";
import { useCallback, useEffect, useState } from "react";

export default function useTestTimers(
    isFinished: boolean,
    currentQuestion: Question | undefined,
    answeredQuestions: AnsweredQuestion[],
) {
    const [testTimer, setTestTimer] = useState<number>(0);
    const [currentQuestionTimer, setCurrentQuestionTimer] = useState<number>(0);

    useEffect(() => {
        if (isFinished) return;

        const interval = setInterval(() => {
            setTestTimer((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isFinished]);

    useEffect(() => {
        if (!currentQuestion) return;

        const isQuestionAnswered = answeredQuestions.some(
            (answeredQuestion) => answeredQuestion.id == currentQuestion.id,
        );

        if (isQuestionAnswered) return;

        const interval = setInterval(() => {
            setCurrentQuestionTimer((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [answeredQuestions, currentQuestion]);

    const resetTimers = useCallback(() => {
        setTestTimer(0);
        setCurrentQuestionTimer(0);
    }, []);

    return {
        testTimer,
        currentQuestionTimer,
        setCurrentQuestionTimer,
        resetTimers,
    };
}
