import { useEffect, useState } from "react";
import type { TestType } from "../types/testData.type";
import type { Question } from "../types/question.type";
import { getMistakeBySectionId, getSectionProgress } from "../helpers/localStorage.helper";
import { QuestionService } from "../services/question.service";
import type { useTestLoaderProps } from "../props/hooks/useTestLoaderProps";

function getSpecialTestData(testId?: string): TestType | undefined {
    if (testId == "twenty-questions") {
        return {
            section_id: 0,
            title: "20 випадкових запитань",
            total: "20",
            correct: "0",
            completed: "0",
        };
    }

    if (testId == "top-difficult") {
        return {
            section_id: 0,
            title: "100 найпоширеніших помилок",
            total: "100",
            correct: "0",
            completed: "0",
        };
    }

    if (testId == "exam") {
        return {
            section_id: 0,
            title: "Іспит",
            total: "20",
            correct: "0",
            completed: "0",
        };
    }

    return undefined;
}

async function getMistakeQuestions(testId: string): Promise<Question[]> {
    const mistakes = getMistakeBySectionId(testId);
    const mistakeQuestionIds = new Set(mistakes.map((mistake) => mistake.question_id));
    const sectionQuestions = await QuestionService.getSectionQuestions(Number(testId));

    return sectionQuestions.filter((question) => mistakeQuestionIds.has(question.id));
}

export default function useTestLoader({ testId, mode }: useTestLoaderProps) {
    const [testData, setTestData] = useState<TestType>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [questionTimers, setQuestionTimers] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!testId) return;

        async function loadTest() {
            if (!testId) return;

            try {
                setIsLoading(true);
                setError("");

                setTestData(undefined);
                setQuestions([]);
                setCurrentQuestion(undefined);
                setQuestionTimers([]);

                if (mode === "mistakes") {
                    const sectionProgress = getSectionProgress(Number(testId));

                    setTestData({
                        section_id: Number(testId),
                        title: sectionProgress?.title
                            ? `Робота над помилками: ${sectionProgress.title}`
                            : "Робота над помилками",
                        total: "0",
                        correct: "0",
                        completed: "0",
                    });

                    const loadedQuestions = await getMistakeQuestions(testId);

                    if (loadedQuestions.length === 0) {
                        setError("У цій темі немає помилок для виправлення.");
                        return;
                    }

                    const timers = new Array<number>(loadedQuestions.length).fill(0);

                    setQuestions(loadedQuestions);
                    setQuestionTimers(timers);
                    setCurrentQuestion(loadedQuestions[0]);

                    return;
                }

                const specialTestData = getSpecialTestData(testId);

                if (specialTestData) {
                    setTestData(specialTestData);
                } else {
                    const sectionProgress = getSectionProgress(Number(testId));

                    if (sectionProgress) {
                        setTestData(sectionProgress);
                    }
                }

                const loadedQuestions = await QuestionService.getAllQuestions(testId);
                const timers = new Array<number>(loadedQuestions.length).fill(0);

                setQuestions(loadedQuestions);
                setQuestionTimers(timers);
                setCurrentQuestion(loadedQuestions[0]);
            } catch (error) {
                console.log(error);
                setError("Не вдалося завантажити тест.");
            } finally {
                setIsLoading(false);
            }
        }

        loadTest();
    }, [testId, mode]);

    return {
        testData,
        questions,
        currentQuestion,
        setCurrentQuestion,
        questionTimers,
        setQuestionTimers,
        isLoading,
        error,
    };
}
