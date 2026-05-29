import { Link, useNavigate } from "react-router-dom";
import type { TestSectionComponentProps } from "../props/testSectionComponentProps.type";

export default function TestSection({
    section,
    mistakes,
    isExtended,
    onToggle,
    progressVisualization,
    showConfigBtns,
    mode,
}: TestSectionComponentProps) {
    const navigate = useNavigate();
    const isMistakesMode = mode == "mistakes";
    const hasMistakesInSection = mistakes?.some((mistake) => Number(mistake.section_id) == section.section_id) ?? false;

    function startTest(testId: number) {
        if (isMistakesMode) {
            navigate(`/mistakes/${testId}`);
        } else {
            navigate(`/test/${testId}`);
        }
    }

    function calcProgress() {
        return isNaN((100 / parseInt(section.total)) * parseInt(section.correct))
            ? 0
            : Math.round((100 / parseInt(section.total)) * parseInt(section.correct));
    }

    function defineSectionColor() {
        const progress = calcProgress();

        if (progress > 0 && progress < 30) {
            return "red";
        } else if (progress >= 30 && progress < 70) {
            return "yellow";
        } else if (progress >= 70) {
            return "green";
        }

        return "white";
    }

    return (
        <div key={section.section_id} className="test-section">
            <div className="test-info-block" onClick={onToggle}>
                <div
                    className={`test-progress-block ${isExtended ? "hidden" : `${section.section_id}`}`}
                    style={{
                        width: `${progressVisualization == "percent" ? calcProgress() : 0}%`,
                    }}
                ></div>

                <div className="test-info">
                    <p className="test-name">{section.title}</p>
                    <p
                        className={`test-progress-text ${progressVisualization == "percent" ? (isExtended ? "hidden" : "") : ""}`}
                    >
                        {progressVisualization == "percent" ? (
                            `${calcProgress()}%`
                        ) : (
                            <div className={`circle ${defineSectionColor()}`}></div>
                        )}
                    </p>
                </div>

                <div className={`additional-info-block ${isExtended ? "" : "collapsed"}`}>
                    <p>
                        Усього запитань у темі: <span className="bold">{section.total}</span>
                    </p>
                    <p>
                        Усього пройдено запитань: <span className="bold">{section.completed}</span>
                    </p>
                    <p>
                        Не пройдено запитань:{" "}
                        <span className="bold">{parseInt(section.total) - parseInt(section.completed)}</span>
                    </p>
                    <p>
                        Правильні відповіді: <span className="bold">{section.correct}</span>
                    </p>
                    <p>
                        Неправильні відповіді:{" "}
                        <span className="bold">{parseInt(section.completed) - parseInt(section.correct)}</span> (
                        <Link to="/mistakes" className="link underline">
                            Робота над помилками
                        </Link>
                        )
                    </p>
                    <p>
                        Прогрес за темою: <span>{calcProgress()}%</span>
                    </p>
                </div>
            </div>

            <button
                className="btn btn-start"
                onClick={() => startTest(section.section_id)}
                disabled={isMistakesMode && !hasMistakesInSection}
            >
                <div className="triangle"></div>
            </button>

            {showConfigBtns && (
                <div className="btn-block">
                    <button className="btn btn-questions" title="Перемішати запитання у темі"></button>
                    <button className="btn btn-answers" title="Перемішати варіанти відповідей"></button>
                </div>
            )}
        </div>
    );
}
