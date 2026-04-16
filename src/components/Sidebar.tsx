import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="nav-sections">
                <div className="section books">
                    <div className="link-block">
                        <Link className="link" to="/dovidniki">
                            Довідники
                        </Link>
                    </div>
                </div>
                <div className="section courses">
                    <div className="link-block">
                        <Link className="link" to="/courses">
                            Навчання теорії
                        </Link>
                    </div>
                </div>
                <div className="section tests">
                    <div className="link-block">
                        <Link className="link bold" to="/tests">
                            Тести з ПДР
                        </Link>
                    </div>
                    <div className="section-dropdown">
                        <Link className="link" to="/tests">
                            Запитання до теми
                        </Link>
                        <Link className="link" to="/twenty-questions">
                            20 випадкових запитань
                        </Link>
                        <Link className="link" to="top-difficult">
                            100 найпоширеніших помилок
                        </Link>
                        <Link className="link" to="/mistakes">
                            Робота над помилками
                        </Link>
                        <Link className="link" to="/favourites">
                            Обране
                        </Link>
                        <Link className="link" to="/exam">
                            Іспит
                        </Link>
                    </div>
                </div>
                <div className="section practical-courses">
                    <div className="link-block">
                        <Link className="link" to="/practical-courses">
                            Іспит з водіння
                        </Link>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
}
