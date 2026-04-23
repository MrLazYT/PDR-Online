import { useNavigate } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import type { MenuItem } from "../types/menuItem";

export default function Books() {
    const navigate = useNavigate();

    const topMenuItems: MenuItem[] = [
        {
            title: "ПДР",
            link: "pdr",
        },
        {
            title: "Водіння авто",
            link: "pidruchnyk-z-vodinnia",
        },
        {
            title: "Будова авто",
            link: "pidruchnyk-po-vlashtuvanniu-avtomobilia",
        },
        {
            title: "Меддопомога",
            link: "medychna-dopomoha",
        },
        {
            title: "Ваш адвокат",
            link: "vash-advokat",
        },
        {
            title: "Таблиця штрафів",
            link: "penalty-information",
        },
    ];

    const books = [
        {
            title: "ПДР 2026 України з ілюстраціями, коментарями та відео",
            image: "/src/assets/books/books-icon-1.svg",
            link: "pdr",
        },
        {
            title: "Підручник з водіння автомобіля",
            image: "/src/assets/books/books-icon-2.svg",
            link: "pidruchnyk-z-vodinnia",
        },
        {
            title: "Підручник з будови автомобіля",
            image: "/src/assets/books/books-icon-3.svg",
            link: "pidruchnyk-po-vlashtuvanniu-avtomobilia",
        },
        {
            title: "Перша медична допомога при ДТП",
            image: "/src/assets/books/books-icon-4.svg",
            link: "medychna-dopomoha",
        },
        {
            title: "Поради адвоката при ДТП",
            image: "/src/assets/books/books-icon-5.svg",
            link: "vash-advokat",
        },
        {
            title: "Штрафи та інші санкції для водіїв і пішоходів (КУпАП)",
            image: "/src/assets/books/books-icon-6.svg",
            link: "penalty-information",
        },
        {
            title: "Інформація про отримання посвідчення водія",
            image: "/src/assets/books/books-icon-7.svg",
            link: "driving-license",
        },
    ];

    const handleReadBtn = (link: string) => {
        navigate(link);
    };

    return (
        <div>
            <TopMenu topMenuItems={topMenuItems} selectedItem={-1} />

            <div className="container">
                <div className="book-sections">
                    <h2 className="section-title">ДОВІДНИКИ</h2>

                    <div className="books-block">
                        {books.map((book, index) => (
                            <div key={index} className="book">
                                <img className="book-image" src={book.image} />

                                <div className="book-info">
                                    <h2 className="book-title">{book.title}</h2>

                                    <div className="btn-section">
                                        <div className="btn btn-book" onClick={() => handleReadBtn(book.link)}>
                                            Читати
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
