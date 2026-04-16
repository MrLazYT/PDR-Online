import { Link } from "react-router-dom";
import { BASE } from "../helpers/base.helper";
import logo from "/src/assets/logo.png";
import avatar from "/src/assets/avatar.webp";

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo-link">
                <img src={logo} className="logo" alt="logo" />
            </Link>

            <div className="user-info">
                <div className="pro-status">
                    <span className="description">Тип акаунту</span>
                </div>

                <div className="notifications">
                    <span className="description">Сповіщення</span>
                </div>

                <div className="messages">
                    <span className="description">Повідомлення</span>
                </div>

                <div className="category">
                    <p className="category-type">B</p>
                    <span className="description">Категорія посвідчення, за якою Ви проходите навчання</span>
                </div>

                <div className="account">
                    <div className="account-link">
                        <Link to="/" className="account-link">
                            <img src={avatar} className="account-avatar" />
                        </Link>

                        <div className="account-dropdown">
                            <p className="account-name">Тестенко Тест Тестович</p>
                            <Link className="link" to="/personal-data">
                                Персональні дані
                            </Link>
                            <Link className="link" to="/statistics">
                                Статистика
                            </Link>
                            <Link className="link" to="/awards">
                                Нагороди
                            </Link>
                            <Link className="link" to="/groups">
                                Моя група
                            </Link>
                            <Link className="link" to="/messages">
                                Повідомлення
                            </Link>
                            <Link className="link" to="/comments">
                                Коментарі
                            </Link>
                            <Link className="link" to="/leave">
                                Вихід
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
