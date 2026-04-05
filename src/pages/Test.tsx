import { useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import { TestService } from "../services/test.service";
import { useParams } from "react-router-dom";
import { QuestionService } from "../services/question.service";

export default function Test() {
    const { testId } = useParams();
    const [testData, setTestData] = useState<any>();
    const [questions, setQuestions] = useState<any[]>();
    const [currentQuestion, setCurrentQuestion] = useState<any>();

    useEffect(() => {
        async function getTestData() {
            const data = await TestService.getTest(parseInt(testId!));

            setTestData(data);
        }

        async function getQuestionData() {
            const data = await QuestionService.getAllQuestions(parseInt(testId!));

            setQuestions([...data]);
            setCurrentQuestion(data[0]);
        }

        getTestData();
        getQuestionData();
    }, [])

    function selectQuestion(questionId: number) {
        const question = questions?.find(question => question.id == questionId)

        setCurrentQuestion(question);
    }

    return (
        <div>
            <TopMenu />
            
            <div className="container">
                <div className="test-sections">
                    <p className="title">{testData?.title}</p>
                    <div className="timers">
                        <div className="timer">
                            <p className="timer-title">Розмірковуємо над запитанням:</p>
                            <p className="timer-text"></p>
                        </div>

                        <div>
                            <p className="timer-title">Загальний час тестування:</p>
                            <p className="timer-text"></p>
                        </div>
                    </div>

                    <div className="test-config-section">
                        <div className="test-questions-block">
                            {questions?.map((_, index) => (
                                <div key={_.id} className="btn question-btn" onClick={() => selectQuestion(_.id)}>
                                    {index + 1}
                                </div>
                            ))}
                        </div>

                        <div className="test-config">
                            <button className="circle-btn btn-pause"></button>
                            <button className="circle-btn btn-reset"></button>
                        </div>
                    </div>

                    <div className="question-block">
                        <h2 className="question">
                            {currentQuestion?.text}
                        </h2>

                        <div className="question-info">
                            <div className="btn-block-ver">
                                {currentQuestion?.answers.map((answer: any) => (
                                    <div key={answer.id} className="btn btn-question">
                                        {answer?.text}
                                    </div>
                                ))}
                            </div>
                            <img className="image" src={currentQuestion?.image}></img>
                        </div>
                    </div>

                    <div className="help-block">
                        <div className="slider">
                            <div className="slider-title">Допомога Експерта</div>
                            <span className="slider-content">{currentQuestion?.expert_comment}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
