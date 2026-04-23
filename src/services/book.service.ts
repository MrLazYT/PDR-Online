import type { Chapter } from "../types/chapter.type";

export class BookService {
    private static path: string = "/data/books";

    public static async getChapters(bookName: string): Promise<Chapter[]> {
        const response = await fetch(`${this.path}/${bookName}/rozdily.json`);
        const data = await response.json();

        return data;
    }

    public static async getChapter(bookName: string, chapterId: string) {
        const normalizedChapterId = chapterId.replaceAll(".", "_");
        const response = await fetch(`${this.path}/${bookName}/rozdil_${normalizedChapterId}.json`);

        const data = await response.json();

        return data;
    }
}
