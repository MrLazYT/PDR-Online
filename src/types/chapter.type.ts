export interface Chapter {
    id: string;
    chapterId: string;
    subsectionId: string;
    type: "main" | "sub";
    hasContent: boolean;
    title: string;
}
