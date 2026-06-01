import type { BookContentMode } from "../../../types/book.type";

export interface GetBookChapterFileIdProps {
    chapterId: string;
    subsectionId: string;
    content_mode: BookContentMode;
}
