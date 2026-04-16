import { useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import { Link, useNavigate } from "react-router-dom";
import type { TestType } from "../types/testData.type";
import { getSectionProgresses, setSectionProgress } from "../helpers/localStorage.helper";

export default function Tests() {
    const [testSections, setTestSections] = useState<TestType[]>([]);
    const [extendedTestId, setExtendedTestId] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTestSections() {
            const sections = getSectionProgresses();

            if (sections.length == 0) {
                const response = await fetch("../data/tests/sections.json");
                const data: TestType[] = await response.json();
                setSectionProgress(data);

                setTestSections([...data]);
            } else {
                setTestSections([...sections]);
            }
        }

        fetchTestSections();
    }, []);

    function extendTest(testId: number) {
        setExtendedTestId(extendedTestId == testId ? 0 : testId);
    }

    function startTest(testId: number) {
        navigate(`/test/${testId}`);
    }

    return (
        <>
            <TopMenu />

            <div className="container">
                <div className="test-sections">
                    {testSections.map((section: TestType) => (
                        <div key={section.section_id} className="test-section">
                            <div className="test-info-block" onClick={() => extendTest(section.section_id)}>
                                <div
                                    className={`test-progress-block ${extendedTestId == section.section_id ? "hidden" : `${section.section_id}`}`}
                                    style={{
                                        width: `${
                                            isNaN((100 / parseInt(section.total)) * parseInt(section.correct))
                                                ? 0
                                                : Math.round(
                                                      (100 / parseInt(section.total)) * parseInt(section.correct),
                                                  )
                                        }%`,
                                    }}
                                ></div>

                                <div className="test-info">
                                    <p className="test-name">{section.title}</p>
                                    <p
                                        className={`test-progress-text ${extendedTestId == section.section_id ? "hidden" : ""}`}
                                    >
                                        {isNaN((100 / parseInt(section.total)) * parseInt(section.correct))
                                            ? 0
                                            : Math.round((100 / parseInt(section.total)) * parseInt(section.correct))}
                                        %
                                    </p>
                                </div>

                                <div
                                    className={`additional-info-block ${extendedTestId == section.section_id ? "" : "collapsed"}`}
                                >
                                    <p>
                                        Усього запитань у темі: <span className="bold">{section.total}</span>
                                    </p>
                                    <p>
                                        Усього пройдено запитань: <span className="bold">{section.completed}</span>
                                    </p>
                                    <p>
                                        Не пройдено запитань:{" "}
                                        <span className="bold">
                                            {parseInt(section.total) - parseInt(section.completed)}
                                        </span>
                                    </p>
                                    <p>
                                        Правильні відповіді: <span className="bold">{section.correct}</span>
                                    </p>
                                    <p>
                                        Неправильні відповіді:{" "}
                                        <span className="bold">
                                            {parseInt(section.completed) - parseInt(section.correct)}
                                        </span>{" "}
                                        (
                                        <Link to="/mistakes" className="link underline">
                                            Робота над помилками
                                        </Link>
                                        )
                                    </p>
                                    <p>
                                        Прогрес за темою:{" "}
                                        <span>
                                            {isNaN((100 / parseInt(section.total)) * parseInt(section.correct))
                                                ? 0
                                                : Math.round(
                                                      (100 / parseInt(section.total)) * parseInt(section.correct),
                                                  )}
                                            %
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <button className="btn btn-start" onClick={() => startTest(section.section_id)}>
                                <div className="triangle"></div>
                            </button>

                            <div className="btn-block">
                                <button className="btn btn-questions" title="Перемішати запитання у темі"></button>
                                <button className="btn btn-answers" title="Перемішати варіанти відповідей"></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
