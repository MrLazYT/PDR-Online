import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import TestScrollBar from "../components/TestScrollBar";
import Timer from "../components/Timer";
import TestConfig from "../components/btn_blocks/testConfig";
import ScrollQuestionsBtnBlock from "../components/btn_blocks/ScrollQuestionsBtnBlock";
import QuestionsBtnBlock from "../components/btn_blocks/QuestionsBtnBlock";
import QuestionHelpBlock from "../components/QuestionHelpBlock";
import QuestionBlock from "../components/QuestionBlock";
import TestEndedDialog from "../components/dialogs/TestEndedDialog";
import { testsTopMenuItems } from "../constants/menus/testsTopMenuItems";
import useTestLoader from "../hooks/useTestLoader";
import useTestTimers from "../hooks/useTestTimers";
import useQuestionScroll from "../hooks/useQuestionScroll";
import useQuestionNavigation from "../hooks/useQuestionNavigation";
import useTestAnswering from "../hooks/useTestAnswering";
import type { TestProps } from "../props/pages/testProps";

export default function Test({ mode = "test" }: TestProps) {
    const { testId } = useParams();
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const questionsBlockRef = useRef<HTMLDivElement>(null);
    const questionsScrollBlockRef = useRef<HTMLDivElement>(null);

    const {
        testData,
        questions,
        currentQuestion,
        setCurrentQuestion,
        questionTimers,
        setQuestionTimers,
        isLoading,
        error,
    } = useTestLoader({ testId, mode });

    const {
        answeredQuestions,
        isFinished,
        isFinishedDialogShown,
        answerQuestion,
        resetAnswering,
        updateFinishedDialogShownStatus,
    } = useTestAnswering({
        testId,
        mode,
        currentQuestion,
        questionsLength: questions.length,
    });

    const { testTimer, currentQuestionTimer, setCurrentQuestionTimer, resetTimers } = useTestTimers(
        isFinished,
        currentQuestion,
        answeredQuestions,
    );

    const { selectQuestion, goToNextQuestion } = useQuestionNavigation({
        questions,
        currentQuestion,
        setCurrentQuestion,
        questionTimers,
        setQuestionTimers,
        currentQuestionTimer,
        setCurrentQuestionTimer,
    });

    const {
        questionScrollPosition,
        questionsBlockScrollPosition,
        scrollToStart,
        scrollToEnd,
        scrollForward,
        scrollBackward,
    } = useQuestionScroll({
        questionsLength: questions.length,
        scrollbarRef,
        scrollRef,
        questionsBlockRef,
        questionsScrollBlockRef,
    });

    useEffect(() => {
        resetAnswering();
        resetTimers();
        scrollToStart();
    }, [testId, resetAnswering, resetTimers, scrollToStart]);

    const handleAnswerQuestion = useCallback(
        (answerId: string) => {
            const wasAnswered = answerQuestion(answerId);

            if (wasAnswered) {
                goToNextQuestion();
            }
        },
        [answerQuestion, goToNextQuestion],
    );

    if (isLoading) {
        return <p>Завантаження тест...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!currentQuestion) {
        return <p>Завантаження питання...</p>;
    }

    return (
        <div>
            <TopMenu topMenuItems={testsTopMenuItems} selectedItem={0} />

            <div className="container">
                <div className="test-sections">
                    <p className="title">{testData?.title}</p>

                    <div className="timers">
                        <Timer title="Розмірковуємо над запитанням:" seconds={currentQuestionTimer} />
                        <Timer title="Загальний час тестування:" seconds={testTimer} />
                    </div>

                    <TestScrollBar
                        scrollbarRef={scrollbarRef}
                        scrollRef={scrollRef}
                        questions={questions}
                        questionScrollPosition={questionScrollPosition}
                        questionsScrollBlockRef={questionsScrollBlockRef}
                    />

                    <div className="test-config-section">
                        <div className="scroll-section">
                            <ScrollQuestionsBtnBlock
                                position="start"
                                fullScrollOnClick={scrollToStart}
                                partialScrollOnClick={scrollBackward}
                            />

                            <QuestionsBtnBlock
                                questionsBlockRef={questionsBlockRef}
                                questionsScrollBlockRef={questionsScrollBlockRef}
                                questions={questions}
                                currentQuestion={currentQuestion}
                                questionsBlockScrollPosition={questionsBlockScrollPosition}
                                answeredQuestions={answeredQuestions}
                                selectQuestion={selectQuestion}
                            />

                            <ScrollQuestionsBtnBlock
                                position="end"
                                fullScrollOnClick={scrollToEnd}
                                partialScrollOnClick={scrollForward}
                            />
                        </div>

                        <TestConfig />
                    </div>

                    <QuestionBlock
                        currentQuestion={currentQuestion}
                        answeredQuestions={answeredQuestions}
                        answerQuestion={handleAnswerQuestion}
                    />

                    <QuestionHelpBlock currentQuestion={currentQuestion} />
                </div>

                <TestEndedDialog isShown={isFinishedDialogShown} toggleShown={updateFinishedDialogShownStatus} />
            </div>
        </div>
    );
}
