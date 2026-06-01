import type { Chapter } from "../types/chapter.type";

export class BookService {
    private static path: string = "/data/books";
    private static chapterCache = new Map<string, unknown>();

    public static async getChapters(bookName: string): Promise<Chapter[]> {
        const response = await fetch(`${this.path}/${bookName}/rozdily.json`);
        const data = await response.json();

        return data;
    }

    public static async getChapterMeta(bookName: string, chapterId: string): Promise<Chapter> {
        const data = await this.getChapters(bookName);

        const chapter = data.find((chapter) => chapter.chapterId == chapterId);

        return chapter!;
    }

    public static async getChapter(bookName: string, chapterId: string) {
        const url = `${this.path}/${bookName}/rozdil_${chapterId}.json`;

        if (this.chapterCache.has(url)) {
            return this.chapterCache.get(url);
        }

        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Chapter not found: ${bookName} - ${chapterId}`);

            return undefined;
        }

        const data = await response.json();

        return data;
    }

    public static async getBooks() {
        const response = await fetch(`${this.path}/books.json`);
        const data = await response.json();

        return data;
    }
}
