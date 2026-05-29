import type Book from "../types/book.type";
import type { MenuItem } from "../types/menuItem";

function convertBookToMenuItem(book: Book): MenuItem {
    return {
        title: book.short_title,
        link: book.is_available ? book.link : "",
    };
}

export function convertBooksToMenuItems(books: Book[]): MenuItem[] {
    const menuItems: MenuItem[] = [];

    books.forEach((book) => {
        const menuItem = convertBookToMenuItem(book);

        if (!menuItem.title) return;

        menuItems.push(menuItem);
    });

    return menuItems;
}
