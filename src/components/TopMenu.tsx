export default function TopMenu() {
    return (
        <ul className="top-menu">
            <li className="menu-item">
                <a className="link selected" href="/tests">
                    Запитання до теми
                </a>
            </li>

            <li className="menu-item">
                <a className="link" href="/twenty-questions">
                    20 випадкових запитань
                </a>
            </li>

            <li className="menu-item">
                <a className="link" href="/top-difficult">
                    100 найпоширеніших помилок
                </a>
            </li>

            <li className="menu-item">
                <a className="link" href="/mistakes">
                    Робота над помилками
                </a>
            </li>

            <li className="menu-item">
                <a className="link" href="/favourites">
                    Обране
                </a>
            </li>

            <li className="menu-item">
                <a className="link" href="/exam">
                    Іспит
                </a>
            </li>
        </ul>
    );
}
