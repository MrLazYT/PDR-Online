export interface Chapter {
    id: string;
    chapterId: string;
    type: "main" | "sub";
    hasContent: boolean;
    title: string;
}
