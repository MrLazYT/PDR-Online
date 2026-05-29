import { useCallback, useState } from "react";
import type { AnsweredQuestion } from "../types/answeredQuestion.type";
import SaveTestProgress from "../utils/saveTestProgress";
import type { Mistake } from "../types/mistake.type";
import type { UseTestAnsweringProps } from "../props/hooks/useTestAnsweringProps";
import { addMistakeToLocalStorage, removeMistake } from "../helpers/localStorage.helper";

export default function useTestAnswering({ testId, mode, currentQuestion, questionsLength }: UseTestAnsweringProps) {
    const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [isFinishedDialogShown, setIsFinishedDialogShown] = useState<boolean>(false);

    const answerQuestion = useCallback(
        (answerId: string): boolean => {
            if (!currentQuestion || !testId) return false;

            const isAlreadyAnswered = answeredQuestions.some(
                (answeredQuestion) => answeredQuestion.id == currentQuestion.id,
            );

            if (isAlreadyAnswered) return false;

            const isRight: boolean = currentQuestion.rightAnswerId == answerId;

            const answeredQuestion: AnsweredQuestion = {
                id: currentQuestion.id,
                section_id: testId,
                answered_id: answerId,
                isRight: isRight,
            };

            const updatedAnswers = [...answeredQuestions, answeredQuestion];

            setAnsweredQuestions(updatedAnswers);

            if (mode === "test" && !isRight) {
                const mistake: Mistake = {
                    question_id: currentQuestion.id,
                    section_id: testId,
                };

                addMistakeToLocalStorage(mistake);
            }

            if (mode === "mistakes" && isRight) {
                removeMistake(currentQuestion.id, testId);
            }

            if (updatedAnswers.length === questionsLength) {
                setIsFinished(true);
                setIsFinishedDialogShown(true);

                if (mode === "test") {
                    SaveTestProgress({ testId, answeredQuestions: updatedAnswers });
                }
            }

            return true;
        },
        [answeredQuestions, currentQuestion, mode, questionsLength, testId],
    );

    const resetAnswering = useCallback(() => {
        setAnsweredQuestions([]);
        setIsFinished(false);
        setIsFinishedDialogShown(false);
    }, []);

    const updateFinishedDialogShownStatus = useCallback(() => {
        setIsFinishedDialogShown((prev) => !prev);
    }, []);

    return {
        answeredQuestions,
        isFinished,
        isFinishedDialogShown,
        answerQuestion,
        resetAnswering,
        updateFinishedDialogShownStatus,
    };
}
