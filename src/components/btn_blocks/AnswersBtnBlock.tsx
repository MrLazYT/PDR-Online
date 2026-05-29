import type { AnswersBtnBlockProps } from "../../props/answersBtnBlockProps";
import AnswerBtn from "../buttons/AnswerBtn";

export default function AnswersBtnBlock({ currentQuestion, answeredQuestions, answerQuestion }: AnswersBtnBlockProps) {
    return (
        <div className="btn-block-ver">
            {currentQuestion.answers.map((answer: any) => (
                <AnswerBtn
                    answer={answer}
                    answeredQuestions={answeredQuestions}
                    currentQuestion={currentQuestion}
                    answerQuestion={() => answerQuestion(answer.id)}
                />
            ))}
        </div>
    );
}
