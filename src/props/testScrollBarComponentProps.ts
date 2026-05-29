import type { Question } from "../types/question.type";

export interface TestScrollBarComponentProps {
    questions: Question[];
    questionScrollPosition: number;
    scrollbarRef: React.RefObject<HTMLDivElement | null>;
    scrollRef: React.RefObject<HTMLDivElement | null>;
    questionsScrollBlockRef: React.RefObject<HTMLDivElement | null>;
}
