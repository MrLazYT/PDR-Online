import type { UseQuestionNavigationProps } from "../props/hooks/useQuestionNavigationProps";

export default function useQuestionNavigation({
    questions,
    currentQuestion,
    setCurrentQuestion,
    questionTimers,
    setQuestionTimers,
    currentQuestionTimer,
    setCurrentQuestionTimer,
}: UseQuestionNavigationProps) {
    function saveCurrentQuestionTimer(): number[] {
        if (!currentQuestion) return questionTimers;

        const currentQuestionIndex = questions.findIndex((question) => question.id == currentQuestion.id);

        if (currentQuestionIndex === -1) return questionTimers;

        const updatedTimers = [...questionTimers];
        updatedTimers[currentQuestionIndex] = currentQuestionTimer;

        return updatedTimers;
    }

    function selectQuestion(questionId: number): void {
        if (!currentQuestion) return;

        const nextQuestion = questions.find((question) => question.id == questionId);

        if (!nextQuestion) return;

        const nextQuestionIndex = questions.findIndex((question) => question.id == questionId);

        if (nextQuestionIndex === -1) return;

        const updatedTimers = saveCurrentQuestionTimer();

        setCurrentQuestion(nextQuestion);
        setQuestionTimers(updatedTimers);
        setCurrentQuestionTimer(updatedTimers[nextQuestionIndex] ?? 0);
    }

    function goToNextQuestion(): void {
        if (!currentQuestion) return;

        const currentQuestionIndex = questions.findIndex((question) => question.id == currentQuestion.id);

        if (currentQuestionIndex === -1) return;

        const nextQuestionIndex = currentQuestionIndex + 1;

        if (nextQuestionIndex >= questions.length) return;

        const updatedTimers = saveCurrentQuestionTimer();

        setCurrentQuestion(questions[nextQuestionIndex]);
        setQuestionTimers(updatedTimers);
        setCurrentQuestionTimer(updatedTimers[nextQuestionIndex] ?? 0);
    }

    return {
        selectQuestion,
        goToNextQuestion,
    };
}
