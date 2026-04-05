export default function Header() {
    return (
        <header className="header">
            <a href="#" className="logo-link">
                <img src="../src/assets/logo.svg" className="logo" alt="logo" />
            </a>

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

                {/* <div>
                    <select className="lang-switch">
                        <option value="ukrainian">UA</option>
                        <option value="english">EN</option>
                    </select>
                </div> */}

                <div className="account">
                    <a href="#" className="account-link">
                        <img src="../src/assets/avatar.webp" className="account-avatar" />

                        <div className="account-dropdown">
                            <p className="account-name">Гладан Денис Тарасович</p>
                            <a className="link" href="/personal-data">
                                Персональні дані
                            </a>
                            <a className="link" href="/statistics">
                                Статистика
                            </a>
                            <a className="link" href="/awards">
                                Нагороди
                            </a>
                            <a className="link" href="/groups">
                                Моя група
                            </a>
                            <a className="link" href="/messages">
                                Повідомлення
                            </a>
                            <a className="link" href="/comments">
                                Коментарі
                            </a>
                            <a className="link" href="/leave">
                                Вихід
                            </a>
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
}
