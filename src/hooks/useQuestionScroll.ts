import { useCallback, useEffect, useRef, useState } from "react";
import type { UseQuestionScrollProps } from "../props/hooks/useQuestionScrollProps";

export default function useQuestionScroll({
    questionsLength,
    scrollbarRef,
    scrollRef,
    questionsBlockRef,
    questionsScrollBlockRef,
}: UseQuestionScrollProps) {
    const [questionScrollPosition, setQuestionScrollPosition] = useState<number>(0);
    const questionScrollPositionRef = useRef<number>(0);
    const [questionsBlockScrollPosition, setQuestionsBlockScrollPosition] = useState<number>(0);
    const questionsBlockScrollPositionRef = useRef<number>(0);
    const isScrollDragging = useRef<boolean>(false);
    const isScrollBlockDragging = useRef<boolean>(false);
    const startX = useRef(0);
    const startXBlock = useRef(0);

    const scrollToStart = useCallback(() => {
        questionScrollPositionRef.current = 0;
        questionsBlockScrollPositionRef.current = 0;

        setQuestionScrollPosition(0);
        setQuestionsBlockScrollPosition(0);
    }, []);

    function getScrollElements() {
        const scrollbar = scrollbarRef.current;
        const scroll = scrollRef.current;
        const scrollBlock = questionsScrollBlockRef.current;

        if (!scrollbar || !scroll || !scrollBlock) return null;

        return {
            scrollbar,
            scroll,
            scrollBlock,
        };
    }

    function getAllScrollElements() {
        const scrollbar = scrollbarRef.current;
        const scroll = scrollRef.current;
        const questionsBlock = questionsBlockRef.current;
        const scrollBlock = questionsScrollBlockRef.current;

        if (!scrollbar || !scroll || !questionsBlock || !scrollBlock) return null;

        return {
            scrollbar,
            scroll,
            questionsBlock,
            scrollBlock,
        };
    }

    function scrollToEnd() {
        const elements = getAllScrollElements();

        if (!elements) return;

        const { scrollbar, scroll, questionsBlock, scrollBlock } = elements;

        if (!scrollbar || !scroll || !scrollBlock || !questionsBlock) return;

        const scrollbarWidth = scrollbar.offsetWidth;
        const scrollWidth = scroll.offsetWidth;
        const newScrollPosition = scrollbarWidth - scrollWidth;

        const questionsBlockWidth = questionsBlock.offsetWidth;
        const questionsScrollBlockWidth = scrollBlock.scrollWidth;
        const newQuestionsBlockScrollPosition = (questionsScrollBlockWidth - questionsBlockWidth) * -1;

        questionScrollPositionRef.current = newScrollPosition;
        questionsBlockScrollPositionRef.current = newQuestionsBlockScrollPosition;

        setQuestionScrollPosition(newScrollPosition);
        setQuestionsBlockScrollPosition(newQuestionsBlockScrollPosition);
    }

    function scrollForward() {
        const elements = getScrollElements();

        if (!elements) return;

        const { scrollbar, scroll, scrollBlock } = elements;

        if (!scrollbar || !scroll || !scrollBlock) return;

        const maxScrollbarWidth = scrollbar.offsetWidth - scroll.offsetWidth;
        const maxScrollBlockWidth = scrollBlock.scrollWidth - scrollBlock.offsetWidth;

        if (maxScrollbarWidth <= 0) return;

        const ratio = maxScrollBlockWidth / maxScrollbarWidth;

        let newScrollPosition = questionScrollPositionRef.current + scroll.offsetWidth;
        let newQuestionsBlockScrollPosition = newScrollPosition * ratio * -1;

        if (newScrollPosition > maxScrollbarWidth) {
            newScrollPosition = maxScrollbarWidth;
            newQuestionsBlockScrollPosition = -1 * maxScrollBlockWidth;
        }

        questionScrollPositionRef.current = newScrollPosition;
        questionsBlockScrollPositionRef.current = newQuestionsBlockScrollPosition;

        scroll.style.transform = `translateX(${newScrollPosition}px)`;
        scrollBlock.style.transform = `translateX(${newQuestionsBlockScrollPosition}px)`;

        setQuestionScrollPosition(newScrollPosition);
        setQuestionsBlockScrollPosition(newQuestionsBlockScrollPosition);
    }

    function scrollBackward() {
        const elements = getScrollElements();

        if (!elements) return;

        const { scrollbar, scroll, scrollBlock } = elements;

        const maxScrollbarWidth = scrollbar.offsetWidth - scroll.offsetWidth;
        const maxScrollBlockWidth = scrollBlock.scrollWidth - scrollBlock.offsetWidth;

        if (maxScrollbarWidth <= 0) return;

        const ratio = maxScrollBlockWidth / maxScrollbarWidth;

        let newQuestionsBlockScrollPosition = questionsBlockScrollPositionRef.current + scroll.offsetWidth * ratio;
        let newScrollPosition = (newQuestionsBlockScrollPosition / ratio) * -1;

        if (newScrollPosition < 0) {
            newScrollPosition = 0;
            newQuestionsBlockScrollPosition = 0;
        }

        if (newScrollPosition > maxScrollbarWidth) {
            newScrollPosition = maxScrollbarWidth;
            newQuestionsBlockScrollPosition = -1 * maxScrollBlockWidth;
        }

        questionScrollPositionRef.current = newScrollPosition;
        questionsBlockScrollPositionRef.current = newQuestionsBlockScrollPosition;

        scroll.style.transform = `translateX(${newScrollPosition}px)`;
        scrollBlock.style.transform = `translateX(${newQuestionsBlockScrollPosition}px)`;

        setQuestionScrollPosition(newScrollPosition);
        setQuestionsBlockScrollPosition(newQuestionsBlockScrollPosition);
    }

    useEffect(() => {
        const elements = getScrollElements();

        if (!elements) return;

        const { scrollbar, scroll, scrollBlock } = elements;

        const onMouseDown = (e: MouseEvent) => {
            isScrollDragging.current = true;
            startX.current = e.clientX;
            scroll.style.transition = "none";
            scrollBlock.style.transition = "none";
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isScrollDragging.current) return;

            const delta = e.clientX - startX.current;
            startX.current = e.clientX;

            const scrollbarWidth = scrollbar.offsetWidth;
            const scrollWidth = scroll.offsetWidth;

            const maxScrollPosition = scrollbarWidth - scrollWidth;
            const maxBlockScroll = scrollBlock.scrollWidth - scrollBlock.offsetWidth;

            if (maxScrollPosition <= 0) return;

            const ratio = maxBlockScroll / maxScrollPosition;

            let currentPosition = questionScrollPositionRef.current + delta;
            let currentScrollPosition = currentPosition * ratio * -1;

            if (currentPosition < 0) {
                currentPosition = 0;
                currentScrollPosition = 0;
            }

            if (currentPosition + scrollWidth > scrollbarWidth) {
                currentPosition = scrollbarWidth - scrollWidth;
                currentScrollPosition = -1 * maxBlockScroll;
            }

            questionScrollPositionRef.current = currentPosition;
            questionsBlockScrollPositionRef.current = currentScrollPosition;

            scroll.style.transform = `translateX(${currentPosition}px)`;
            scrollBlock.style.transform = `translateX(${currentScrollPosition}px)`;
        };

        const onMouseUp = () => {
            if (!isScrollDragging.current) return;

            isScrollDragging.current = false;
            setQuestionScrollPosition(questionScrollPositionRef.current);
            setQuestionsBlockScrollPosition(questionsBlockScrollPositionRef.current);

            scroll.style.transition = "";
            scrollBlock.style.transition = "";
        };

        scroll.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            scroll.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [questionsLength, scrollbarRef, scrollRef, questionsScrollBlockRef]);

    useEffect(() => {
        const elements = getScrollElements();

        if (!elements) return;

        const { scrollbar, scroll, scrollBlock } = elements;

        const onMouseDown = (e: MouseEvent) => {
            isScrollBlockDragging.current = true;
            startXBlock.current = e.clientX;
            scroll.style.transition = "none";
            scrollBlock.style.transition = "none";
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isScrollBlockDragging.current) return;

            const delta = e.clientX - startXBlock.current;

            const scrollbarWidth = scrollbar.offsetWidth;
            const scrollWidth = scroll.offsetWidth;

            const maxScrollPosition = scrollbarWidth - scrollWidth;
            const maxScrollBlock = scrollBlock.scrollWidth - scrollBlock.offsetWidth;

            if (maxScrollPosition <= 0) return;

            const ratio = maxScrollBlock / maxScrollPosition;

            let currentScrollPosition = questionsBlockScrollPositionRef.current + delta;
            let currentPosition = (currentScrollPosition / ratio) * -1;

            if (currentPosition < 0) {
                currentPosition = 0;
                currentScrollPosition = 0;
            }

            if (currentPosition > maxScrollPosition) {
                currentPosition = maxScrollPosition;
                currentScrollPosition = -1 * maxScrollBlock;
            }

            questionScrollPositionRef.current = currentPosition;
            questionsBlockScrollPositionRef.current = currentScrollPosition;

            scroll.style.transform = `translateX(${currentPosition}px)`;
            scrollBlock.style.transform = `translateX(${currentScrollPosition}px)`;

            startXBlock.current = e.clientX;
        };

        const onMouseUp = () => {
            isScrollBlockDragging.current = false;

            setQuestionScrollPosition(questionScrollPositionRef.current);
            setQuestionsBlockScrollPosition(questionsBlockScrollPositionRef.current);

            scroll.style.transition = "";
            scrollBlock.style.transition = "";
        };

        scrollBlock.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            scrollBlock.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [questionsLength, scrollbarRef, scrollRef, questionsScrollBlockRef]);

    return {
        questionScrollPosition,
        questionsBlockScrollPosition,
        scrollToStart,
        scrollToEnd,
        scrollForward,
        scrollBackward,
    };
}
