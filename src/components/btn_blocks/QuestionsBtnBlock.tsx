import type { QuestionsBtnBlockProps } from "../../props/questionsBtnBlockProps";
import QuestionBtn from "../buttons/QuestionBtn";

export default function QuestionsBtnBlock({
    questions,
    currentQuestion,
    questionsBlockScrollPosition,
    answeredQuestions,
    selectQuestion,
    questionsBlockRef,
    questionsScrollBlockRef,
}: QuestionsBtnBlockProps) {
    return (
        <div ref={questionsBlockRef} id="test-questions-block" className="test-questions-scroll-block">
            <div
                ref={questionsScrollBlockRef}
                id="test-questions-scroll-block"
                className="test-questions-block"
                style={{ transform: `translateX(${questionsBlockScrollPosition}px)` }}
            >
                {questions.map((question, index) => (
                    <QuestionBtn
                        key={question.id}
                        className={`${answeredQuestions.find((cur_question) => cur_question.id == question.id)?.isRight == true ? "btn-question-right" : answeredQuestions.find((cur_question) => cur_question.id == question.id)?.isRight == false ? "btn-question-wrong" : ""} ${question.id == currentQuestion?.id ? "selected" : ""}`}
                        title={`${index + 1}`}
                        onClick={() => selectQuestion(question.id)}
                    />
                ))}
            </div>
        </div>
    );
}
