import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionService } from "../services/question.service";
import type { TestType } from "../types/testData.type";
import type { Question } from "../types/question.type";
import type { AnsweredQuestion } from "../types/answeredQuestion.type";
import type { Mistake } from "../types/mistake.type";
import { addMistakeToLocalStorage, getSectionProgress, updateSectionProgress } from "../helpers/localStorage.helper";
import noImage from "/src/assets/no_image_uk.png";
import type { MenuItem } from "../types/menuItem";
import TopMenu from "../components/TopMenu";

export default function Test() {
    const { testId } = useParams();
    const [testData, setTestData] = useState<TestType>();
    const [questions, setQuestions] = useState<Question[]>();
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [scrollWidth, setScrollWidth] = useState<number>(100);
    const [questionScrollPosition, setQuestionScrollPosition] = useState<number>(0);
    const questionScrollPositionRef = useRef<number>(0);
    const [questionsBlockScrollPosition, setQuestionsBlockScrollPosition] = useState<number>(0);
    const questionsBlockScrollPositionRef = useRef<number>(0);
    const isScrollDragging = useRef<boolean>(false);
    const isScrollBlockDragging = useRef<boolean>(false);
    const startX = useRef(0);
    const startXBlock = useRef(0);
    const [isPDDSectionOpened, setIsPDDSectionOpened] = useState<boolean>(false);
    const [isExpertCommentOpened, setIsExpertCommentOpened] = useState<boolean>(false);
    const [isVideoSectionOpened, setIsVideoSectionOpened] = useState<boolean>(false);
    const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
    const [testTimer, setTestTimer] = useState<number>(0);
    const [questionTimers, setQuestionTimers] = useState<number[]>([]);
    const [currentQuestionTimer, setCurrentQuestionTimer] = useState<number>(0);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [isFinishedDialogShown, setIsFinishedDialogShown] = useState<boolean>(false);
    const navigate = useNavigate();

    const topMenuItems: MenuItem[] = [
        {
            title: "Запитання до теми",
            link: "/tests",
        },
        {
            title: "20 випадкових запитань",
            link: "/twenty-questions",
        },
        {
            title: "100 найпоширеніших помилок",
            link: "/top-difficult",
        },
        {
            title: "Робота над помилками",
            link: "/mistakes",
        },
        {
            title: "Обране",
            link: "/favourites",
        },
        {
            title: "Іспит",
            link: "/exam",
        },
    ];

    useEffect(() => {
        const startTimer = () => {
            if (!isFinished) {
                setTestTimer((prevTime) => prevTime + 1);
            }
        };

        let interval = setInterval(startTimer, 1000);

        return () => clearInterval(interval);
    }, [isFinished]);

    useEffect(() => {
        const startTimer = () => {
            const isQuestionAnswered = answeredQuestions.find(
                (answeredQuestion) => answeredQuestion.id == currentQuestion!.id,
            )
                ? true
                : false;

            if (!isQuestionAnswered) {
                setCurrentQuestionTimer((prevTime) => prevTime + 1);
            }
        };

        let interval = setInterval(startTimer, 1000);

        return () => clearInterval(interval);
    }, [answeredQuestions, currentQuestion]);

    useEffect(() => {
        async function getTestData() {
            const data = await getSectionProgress(parseInt(testId!));

            setTestData(data);
        }

        async function getQuestionData() {
            const data = await QuestionService.getAllQuestions(parseInt(testId!));
            const timers = new Array<number>(data.length).fill(0);

            setQuestions(data);
            setQuestionTimers(timers);
            setCurrentQuestion(data[0]);
            setCurrentQuestionTimer(timers[0]);
        }

        getTestData();
        getQuestionData();
    }, []);

    useEffect(() => {
        const scrollbar = document.getElementById("scrollbar");
        const scrollBlock = document.getElementById("test-questions-scroll-block");

        if (!scrollbar || !scrollBlock || questions?.length == 0) return;

        const scrollbarWidth = scrollbar.offsetWidth;
        const scrollBlockWidth = scrollBlock.scrollWidth;
        const scrollBlockVisibleWidth = scrollBlock.clientWidth;
        const division = scrollBlockWidth / scrollBlockVisibleWidth;
        const scrollWidth = (100 / scrollbarWidth) * (scrollbarWidth / division);

        setScrollWidth(scrollWidth);
    }, [questions]);

    function selectQuestion(questionId: number) {
        const question = questions?.find((question) => question.id == questionId);
        const questionIndex = questions?.indexOf(question!);
        const currentQuestionIndex = questions?.indexOf(currentQuestion!);

        questionTimers[currentQuestionIndex!] = currentQuestionTimer;

        setCurrentQuestion(question);
        setQuestionTimers(questionTimers);
        setCurrentQuestionTimer(questionTimers[questionIndex!]);
    }

    function scrollToStart() {
        questionScrollPositionRef.current = 0;
        questionsBlockScrollPositionRef.current = 0;

        setQuestionScrollPosition(0);
        setQuestionsBlockScrollPosition(0);
    }

    useEffect(() => {
        const scrollbar = document.getElementById("scrollbar");
        const scroll = document.getElementById("scroll");
        const scrollBlock = document.getElementById("test-questions-scroll-block");

        if (!scrollbar || !scroll || !scrollBlock) return;

        const onMouseDown = (e: MouseEvent) => {
            isScrollDragging.current = true;
            startX.current = e.clientX;
            scroll.style.transition = `none`;
            scrollBlock.style.transition = `none`;
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isScrollDragging.current) return;

            const delta = e.clientX - startX.current;
            startX.current = e.clientX;

            const scrollbarWidth = scrollbar.offsetWidth;
            const scrollWidth = scroll.offsetWidth;

            const maxScrollPosition = scrollbarWidth - scrollWidth;
            const maxBlockScroll = scrollBlock.scrollWidth - scrollBlock.offsetWidth;

            const ratio = maxBlockScroll / maxScrollPosition;

            let currentPosition = questionScrollPositionRef.current + delta;
            let currentScrollPosition = currentPosition * ratio * -1;

            if (currentPosition < 0) {
                currentPosition = 0;
            }

            if (currentPosition + scrollWidth > scrollbarWidth) {
                currentPosition = scrollbarWidth - scrollWidth;
                currentScrollPosition = -1 * maxBlockScroll;
            }

            if (currentPosition == 0) {
                currentScrollPosition = 0;
            }

            if (currentScrollPosition > maxBlockScroll) {
                currentScrollPosition = maxBlockScroll;
            }

            questionScrollPositionRef.current = currentPosition;
            questionsBlockScrollPositionRef.current = currentScrollPosition;
            scroll.style.transform = `translateX(${currentPosition}px)`;
            scrollBlock.style.transform = `translateX(${currentScrollPosition}px)`;
            scrollBlock.style.transform = `translateX(${currentScrollPosition}px)`;
        };

        const onMouseUp = () => {
            if (!isScrollDragging.current) return;
            isScrollDragging.current = false;
            setQuestionScrollPosition(questionScrollPositionRef.current);
            setQuestionsBlockScrollPosition(questionsBlockScrollPositionRef.current);
            scroll.style.transition = "";
            scrollBlock.style.transition = "";
        };

        scroll.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            scroll.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    useEffect(() => {
        const scrollbar = document.getElementById("scrollbar");
        const scroll = document.getElementById("scroll");
        const scrollBlock = document.getElementById("test-questions-scroll-block");

        if (!scrollbar || !scroll || !scrollBlock) return;

        const onMouseDown = (e: MouseEvent) => {
            isScrollBlockDragging.current = true;
            startXBlock.current = e.clientX;
            scroll.style.transition = "none";
            scrollBlock.style.transition = "none";
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isScrollBlockDragging.current) return;

            const delta = e.clientX - startXBlock.current;

            const scrollbarWidth = scrollbar.offsetWidth;
            const scrollWidth = scroll.offsetWidth;

            const maxScrollPosition = scrollbarWidth - scrollWidth;
            const maxScrollBlock = scrollBlock.scrollWidth - scrollBlock.offsetWidth;

            const ratio = maxScrollBlock / maxScrollPosition;

            let currentScrollPosition = questionsBlockScrollPositionRef.current + delta;
            let currentPosition = (currentScrollPosition / ratio) * -1;

            if (currentPosition < 0) {
                currentPosition = 0;
                currentScrollPosition = 0;
            }

            if (currentPosition > maxScrollPosition) {
                currentPosition = maxScrollPosition;
                currentScrollPosition = -1 * maxScrollBlock;
            }

            questionScrollPositionRef.current = currentPosition;
            questionsBlockScrollPositionRef.current = currentScrollPosition;

            scroll.style.transform = `translateX(${currentPosition}px)`;
            scrollBlock.style.transform = `translateX(${currentScrollPosition}px)`;

            startXBlock.current = e.clientX;
        };

        const onMouseUp = () => {
            isScrollBlockDragging.current = false;
            setQuestionScrollPosition(questionScrollPositionRef.current);
            setQuestionsBlockScrollPosition(questionsBlockScrollPositionRef.current);
            scroll.style.transition = "";
            scrollBlock.style.transition = "";
        };

        scrollBlock.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            scrollBlock.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    function scrollToEnd() {
        const scrollbar = document.getElementById("scrollbar");
        const scroll = document.getElementById("scroll");
        const questionsBlock = document.getElementById("test-questions-block");
        const questionsScrollBlock = document.getElementById("test-questions-scroll-block");

        if (!scrollbar || !scroll || !questionsScrollBlock || !questionsBlock) return;

        const scrollbarWidth = scrollbar.offsetWidth;
        const scrollWidth = scroll.offsetWidth;
        const newScrollPosition = scrollbarWidth - scrollWidth;

        const questionsBlockWidth = questionsBlock.offsetWidth;
        const questionsScrollBlockWidth = questionsScrollBlock.scrollWidth;
        const newQuestionsBlockScrollPosition = (questionsScrollBlockWidth - questionsBlockWidth) * -1;

        questionScrollPositionRef.current = newScrollPosition;
        questionsBlockScrollPositionRef.current = newQuestionsBlockScrollPosition;

        setQuestionScrollPosition(newScrollPosition);
        setQuestionsBlockScrollPosition(newQuestionsBlockScrollPosition);
    }

    function scrollForward() {
        const scrollbar = document.getElementById("scrollbar");
        const scroll = document.getElementById("scroll");
        const scrollBlock = document.getElementById("test-questions-scroll-block");

        if (!scrollbar || !scroll || !scrollBlock) return;

        const maxScrollbarWidth = scrollbar.offsetWidth - scroll.offsetWidth;
        const maxScrollBlockWidth = scrollBlock.scrollWidth - scrollBlock.offsetWidth;

        const ratio = maxScrollBlockWidth / maxScrollbarWidth;

        let newScrollPosition = questionScrollPositionRef.current + scroll.offsetWidth;
        let newQuestionsBlockScrollPosition = newScrollPosition * ratio * -1;

        if (newScrollPosition > maxScrollbarWidth) {
            newScrollPosition = maxScrollbarWidth;
            newQuestionsBlockScrollPosition = -1 * maxScrollBlockWidth;
        }

        questionScrollPositionRef.current = newScrollPosition;
        questionsBlockScrollPositionRef.current = newQuestionsBlockScrollPosition;

        scroll.style.transform = `translateX(${newScrollPosition}px)`;
        scrollBlock.style.transform = `translateX(${newQuestionsBlockScrollPosition}px)`;

        setQuestionScrollPosition(newScrollPosition);
        setQuestionsBlockScrollPosition(newQuestionsBlockScrollPosition);
    }

    function scrollBackward() {
        const scrollbar = document.getElementById("scrollbar");
        const scroll = document.getElementById("scroll");
        const scrollBlock = document.getElementById("test-questions-scroll-block");

        if (!scrollbar || !scroll || !scrollBlock) return;

        const maxScrollbarWidth = scrollbar.offsetWidth - scroll.offsetWidth;
        const maxScrollBlockWidth = scrollBlock.scrollWidth - scrollBlock.offsetWidth;

        const ratio = maxScrollBlockWidth / maxScrollbarWidth;

        let newQuestionsBlockScrollPosition = questionsBlockScrollPositionRef.current + scroll.offsetWidth * ratio;
        let newScrollPosition = (newQuestionsBlockScrollPosition / ratio) * -1;

        if (newScrollPosition < 0) {
            newScrollPosition = 0;
            newQuestionsBlockScrollPosition = 0;
        }

        if (newScrollPosition > maxScrollbarWidth) {
            newScrollPosition = maxScrollBlockWidth;
            newQuestionsBlockScrollPosition = maxScrollBlockWidth;
        }

        questionScrollPositionRef.current = newScrollPosition;
        questionsBlockScrollPositionRef.current = newQuestionsBlockScrollPosition;

        scroll.style.transform = `translateX(${newScrollPosition}px)`;
        scrollBlock.style.transform = `translateX(${newQuestionsBlockScrollPosition}px)`;

        setQuestionScrollPosition(newScrollPosition);
        setQuestionsBlockScrollPosition(newQuestionsBlockScrollPosition);
    }

    function openPDDSection() {
        setIsPDDSectionOpened(!isPDDSectionOpened);
    }

    function openExpertComment() {
        setIsExpertCommentOpened(!isExpertCommentOpened);
    }

    function openVideoSection() {
        setIsVideoSectionOpened(!isVideoSectionOpened);
    }

    function answerQuestion(answerId: string) {
        const isRight: boolean = currentQuestion?.rightAnswerId == answerId;
        const answeredQuestion: AnsweredQuestion = {
            id: currentQuestion?.id!,
            section_id: testId!,
            answered_id: answerId,
            isRight: isRight,
        };

        setAnsweredQuestions((prev) => {
            const updated = [...prev, answeredQuestion];

            if (updated.length === questions?.length) {
                setIsFinished(true);
                setIsFinishedDialogShown(true);

                const sectionProgress = getSectionProgress(parseInt(testId!));

                const correctQuestions = updated.filter((question) => question.isRight == true);

                const updatedProgress: TestType = {
                    section_id: sectionProgress!.section_id,
                    title: sectionProgress!.title,
                    total: sectionProgress!.total,
                    correct: "" + correctQuestions.length,
                    completed: "" + updated.length,
                };

                updateSectionProgress(updatedProgress);
            }

            return updated;
        });

        if (!isRight) {
            const mistake: Mistake = {
                question_id: currentQuestion?.id!,
                section_id: testId!,
            };

            addMistakeToLocalStorage(mistake);
        }

        goToNextQuestion();
    }

    function goToNextQuestion() {
        const currentQuestionIndex = questions?.findIndex((question) => question.id == currentQuestion?.id);

        if (currentQuestionIndex! + 1 < questions!.length) {
            const currentQuestionIndex = questions?.indexOf(currentQuestion!);

            questionTimers[currentQuestionIndex!] = currentQuestionTimer;

            setCurrentQuestion(questions![currentQuestionIndex! + 1]);
            setQuestionTimers(questionTimers);
            setCurrentQuestionTimer(questionTimers[currentQuestionIndex! + 1]);
        }
    }

    function updateFinishedDialogShownStatus() {
        setIsFinishedDialogShown(!isFinishedDialogShown);
    }

    function goBack() {
        navigate("/tests");
    }

    return (
        <div>
            <TopMenu topMenuItems={topMenuItems} selectedItem={0} />

            <div className="container">
                <div className="test-sections">
                    <p className="title">{testData?.title}</p>
                    <div className="timers">
                        <div className="timer">
                            <p className="timer-title">Розмірковуємо над запитанням:</p>
                            <p className="timer-text">
                                <span className="minutes">
                                    {Math.floor(currentQuestionTimer / 60) < 10 ? "0" : ""}
                                    {Math.floor(currentQuestionTimer / 60)}
                                </span>
                                <span className="separator"> : </span>
                                <span className="seconds">
                                    {currentQuestionTimer % 60 < 10 ? "0" : ""}
                                    {currentQuestionTimer % 60}
                                </span>
                            </p>
                        </div>

                        <div className="timer">
                            <p className="timer-title">Загальний час тестування:</p>
                            <p className="timer-text">
                                <span className="minutes">
                                    {Math.floor(testTimer / 60) < 10 ? "0" : ""}
                                    {Math.floor(testTimer / 60)}
                                </span>
                                <span className="separator"> : </span>
                                <span className="seconds">
                                    {testTimer % 60 < 10 ? "0" : ""}
                                    {testTimer % 60}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div id="scrollbar" className="scrollbar">
                        <div
                            id="scroll"
                            className="scroll"
                            style={{
                                width: `${scrollWidth}%`,
                                transform: `translateX(${questionScrollPosition}px)`,
                            }}
                        ></div>
                    </div>

                    <div className="test-config-section">
                        <div className="scroll-section">
                            <div className="scroll-btn-block">
                                <button className="btn btn-question" onClick={scrollToStart}>
                                    {"<<"}
                                </button>

                                <button className="btn btn-question" onClick={scrollBackward}>
                                    {"<"}
                                </button>
                            </div>

                            <div id="test-questions-block" className="test-questions-scroll-block">
                                <div
                                    id="test-questions-scroll-block"
                                    className="test-questions-block"
                                    style={{ transform: `translateX(${questionsBlockScrollPosition}px)` }}
                                >
                                    {questions?.map((question, index) => (
                                        <button
                                            key={question.id}
                                            className={`btn btn-question ${answeredQuestions.find((cur_question) => cur_question.id == question.id)?.isRight == true ? "btn-question-right" : answeredQuestions.find((cur_question) => cur_question.id == question.id)?.isRight == false ? "btn-question-wrong" : ""} ${question.id == currentQuestion?.id ? "selected" : ""}`}
                                            onClick={() => selectQuestion(question.id)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="scroll-btn-block">
                                <button className="btn btn-question" onClick={scrollForward}>
                                    {">"}
                                </button>

                                <button className="btn btn-question" onClick={scrollToEnd}>
                                    {">>"}
                                </button>
                            </div>
                        </div>

                        <div className="test-config">
                            <button className="circle-btn btn-pause">
                                <div className="pause-icon">
                                    <i></i>
                                    <i></i>
                                </div>
                            </button>
                            <button className="circle-btn btn-reset"></button>
                        </div>
                    </div>

                    <div className="question-block">
                        <h2 className="question-title">{currentQuestion?.text}</h2>

                        <div className="question-info">
                            <div className="btn-block-ver">
                                {currentQuestion?.answers.map((answer: any) => (
                                    <button
                                        key={answer.id}
                                        className={`btn btn-answer ${answeredQuestions.find((cur_question) => cur_question.id == currentQuestion.id) && currentQuestion.rightAnswerId == answer.id ? "btn-question-right" : answeredQuestions.find((cur_question) => cur_question.id == currentQuestion.id)?.answered_id == answer.id && answeredQuestions.find((cur_question) => cur_question.id == currentQuestion.id)?.isRight == false ? "btn-question-wrong" : ""}`}
                                        onClick={() => answerQuestion(answer.id)}
                                        disabled={
                                            answeredQuestions.find(
                                                (cur_question) => cur_question.id == currentQuestion.id,
                                            )
                                                ? true
                                                : false
                                        }
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: answer?.text }} />
                                    </button>
                                ))}
                            </div>

                            <img
                                className="image"
                                src={currentQuestion?.image ? currentQuestion?.image : noImage}
                            ></img>
                        </div>
                    </div>

                    <div className="help-block">
                        <div className="help-slider" onClick={openPDDSection}>
                            <div className="help-slider-title">Пункти ПДР</div>
                            <div
                                className={`help-slider-content ${isPDDSectionOpened ? "" : "collapsed"}`}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        new DOMParser().parseFromString(currentQuestion?.pdd_section ?? "", "text/html")
                                            .documentElement.textContent ?? "",
                                }}
                            />
                        </div>

                        {currentQuestion?.expert_comment ? (
                            <div className="help-slider" onClick={openExpertComment}>
                                <div className="help-slider-title">Допомога Експерта</div>
                                <div
                                    className={`help-slider-content ${isExpertCommentOpened ? "" : "collapsed"}`}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            new DOMParser().parseFromString(
                                                currentQuestion?.expert_comment ?? "",
                                                "text/html",
                                            ).documentElement.textContent ?? "",
                                    }}
                                />
                            </div>
                        ) : (
                            ""
                        )}

                        {currentQuestion?.video ? (
                            <div className="help-slider" onClick={openVideoSection}>
                                <div className="help-slider-title">Відеопідказка</div>
                                <div className={`help-slider-content ${isVideoSectionOpened ? "" : "collapsed"}`}>
                                    <iframe
                                        className="iframe-video"
                                        src={`https://www.youtube.com/embed/${currentQuestion?.video}?mute=1&enablejsap=1`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; enablejsap;"
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div className={`dialog-container ${isFinishedDialogShown ? "" : "collapsed"}`}>
                    <div id="dialog" className="dialog" role="dialog" aria-modal="true">
                        <p className="dialog-title">Запитання до теми закінчилися</p>

                        <div className="btn-ver-block">
                            <div className="btn btn-dialog">До попередньої теми</div>
                            <div className="btn btn-dialog" onClick={goBack}>
                                Повернутися до списку тем
                            </div>
                            <div className="btn btn-dialog" onClick={updateFinishedDialogShownStatus}>
                                Залишитися і проаналізувати помилки
                            </div>
                            <div className="btn btn-dialog">До наступної теми</div>
                        </div>
                    </div>
                    <div className="backdrop" onClick={updateFinishedDialogShownStatus} />
                </div>
            </div>
        </div>
    );
}
