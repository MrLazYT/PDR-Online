export interface UseQuestionScrollProps {
    questionsLength: number;
    scrollbarRef: React.RefObject<HTMLDivElement | null>;
    scrollRef: React.RefObject<HTMLDivElement | null>;
    questionsBlockRef: React.RefObject<HTMLDivElement | null>;
    questionsScrollBlockRef: React.RefObject<HTMLDivElement | null>;
}
