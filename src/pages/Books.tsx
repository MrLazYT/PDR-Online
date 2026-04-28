import { useNavigate } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import type { MenuItem } from "../types/menuItem";
import { useEffect, useState } from "react";
import type Book from "../types/book.type";
import { BookService } from "../services/book.service";

export default function Books() {
    const navigate = useNavigate();

    const [books, setBooks] = useState<Book[]>([]);
    const [topMenuItems, setTopMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        function convertBookToMenuItem(book: Book): MenuItem {
            return {
                title: book.short_title,
                link: book.is_available ? book.link : "",
            };
        }

        function convertBooksToMenuItems(books: Book[]): MenuItem[] {
            const menuItems: MenuItem[] = [];

            books.forEach((book) => {
                const menuItem = convertBookToMenuItem(book);

                if (!menuItem.title) return;

                menuItems.push(menuItem);
            });

            return menuItems;
        }

        async function getBooks() {
            const data = await BookService.getBooks();

            setBooks(data);

            const menuItems = convertBooksToMenuItems(data);

            setTopMenuItems(menuItems);
        }

        getBooks();
    }, []);

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
                                        {book.is_available ? (
                                            <div className="btn btn-book" onClick={() => handleReadBtn(book.link)}>
                                                Читати
                                            </div>
                                        ) : (
                                            <button className="btn btn-book" disabled>
                                                Недоступно
                                            </button>
                                        )}
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
