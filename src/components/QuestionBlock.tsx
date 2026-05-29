import type { QuestionBlockProps } from "../props/questionBlockProps";
import AnswersBtnBlock from "./btn_blocks/AnswersBtnBlock";
import QuestionTitle from "./title/questionTitle";
import noImage from "/src/assets/no_image_uk.png";

export default function QuestionBlock({ currentQuestion, answeredQuestions, answerQuestion }: QuestionBlockProps) {
    return (
        <div className="question-block">
            <QuestionTitle title={currentQuestion.text} />

            <div className="question-info">
                <AnswersBtnBlock
                    currentQuestion={currentQuestion}
                    answeredQuestions={answeredQuestions}
                    answerQuestion={answerQuestion}
                />

                <img className="image" src={currentQuestion.image ? currentQuestion.image : noImage}></img>
            </div>
        </div>
    );
}
