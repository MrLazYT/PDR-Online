export type BookContentMode = "chapter-file" | "subsection-file";

export interface Book {
    title: string;
    short_title: string;
    image: string;
    link: string;
    is_available: boolean;
    content_mode: BookContentMode;
}
