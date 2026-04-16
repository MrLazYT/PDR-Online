import { Link } from "react-router-dom";

export default function TopMenu() {
    return (
        <ul className="top-menu">
            <li className="menu-item">
                <Link className="link selected" to="/tests">
                    Запитання до теми
                </Link>
            </li>

            <li className="menu-item">
                <Link className="link" to="/twenty-questions">
                    20 випадкових запитань
                </Link>
            </li>

            <li className="menu-item">
                <Link className="link" to="/top-difficult">
                    100 найпоширеніших помилок
                </Link>
            </li>

            <li className="menu-item">
                <Link className="link" to="/mistakes">
                    Робота над помилками
                </Link>
            </li>

            <li className="menu-item">
                <Link className="link" to="/favourites">
                    Обране
                </Link>
            </li>

            <li className="menu-item">
                <Link className="link" to="/exam">
                    Іспит
                </Link>
            </li>
        </ul>
    );
}
