import type { AnswerBtnProps } from "../../props/answerBtnProps";

export default function AnswerBtn({ answer, answeredQuestions, currentQuestion, answerQuestion }: AnswerBtnProps) {
    return (
        <button
            key={answer.id}
            className={`btn btn-answer ${answeredQuestions.find((cur_question) => cur_question.id == currentQuestion.id) && currentQuestion.rightAnswerId == answer.id ? "btn-question-right" : answeredQuestions.find((cur_question) => cur_question.id == currentQuestion.id)?.answered_id == answer.id && answeredQuestions.find((cur_question) => cur_question.id == currentQuestion.id)?.isRight == false ? "btn-question-wrong" : ""}`}
            onClick={() => answerQuestion()}
            disabled={answeredQuestions.find((cur_question) => cur_question.id == currentQuestion.id) ? true : false}
        >
            <span dangerouslySetInnerHTML={{ __html: answer.text }} />
        </button>
    );
}
