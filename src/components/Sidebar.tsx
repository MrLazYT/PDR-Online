export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="nav-sections">
                <div className="section books">
                    <div className="link-block">
                        <a className="link" href="/books">
                            Довідники
                        </a>
                    </div>
                </div>
                <div className="section courses">
                    <div className="link-block">
                        <a className="link" href="/courses">
                            Навчання теорії
                        </a>
                    </div>
                </div>
                <div className="section tests">
                    <div className="link-block">
                        <a className="link bold" href="/tests">
                            Тести з ПДР
                        </a>
                    </div>
                    <div className="section-dropdown">
                        <a className="link" href="/tests">
                            Запитання до теми
                        </a>
                        <a className="link" href="/twenty-questions">
                            20 випадкових запитань
                        </a>
                        <a className="link" href="top-difficult">
                            100 найпоширеніших помилок
                        </a>
                        <a className="link" href="/mistakes">
                            Робота над помилками
                        </a>
                        <a className="link" href="/favourites">
                            Обране
                        </a>
                        <a className="link" href="/exam">
                            Іспит
                        </a>
                    </div>
                </div>
                <div className="section practical-courses">
                    <div className="link-block">
                        <a className="link" href="/practical-courses">
                            Іспит з водіння
                        </a>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
}
