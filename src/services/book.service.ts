import type { Chapter } from "../types/chapter.type";

export class BookService {
    private static path: string = "/data/books";

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
        const meta = await this.getChapterMeta(bookName, chapterId);

        if (!meta || !meta.hasContent) {
            return null;
        }

        const normalizedChapterId = chapterId.replaceAll(".", "_");
        const response = await fetch(`${this.path}/${bookName}/rozdil_${normalizedChapterId}.json`);
        const data = await response.json();

        return data;
    }

    public static async getBooks() {
        const response = await fetch(`${this.path}/books.json`);
        const data = await response.json();

        return data;
    }
}
