import { useEffect, useState } from "react";
import type { TestScrollBarComponentProps } from "../props/testScrollBarComponentProps";

export default function TestScrollBar({
    questions,
    questionScrollPosition,
    scrollbarRef,
    scrollRef,
    questionsScrollBlockRef,
}: TestScrollBarComponentProps) {
    const [scrollWidth, setScrollWidth] = useState<number>(100);

    useEffect(() => {
        const scrollbar = scrollbarRef.current;
        const scrollBlock = questionsScrollBlockRef.current;

        if (!scrollbar || !scrollBlock || questions.length == 0) return;

        const scrollbarWidth = scrollbar.offsetWidth;
        const scrollBlockWidth = scrollBlock.scrollWidth;
        const scrollBlockVisibleWidth = scrollBlock.clientWidth;

        if (scrollBlockVisibleWidth <= 0 || scrollbarWidth <= 0) return;

        const division = scrollBlockWidth / scrollBlockVisibleWidth;
        const newScrollWidth = (100 / scrollbarWidth) * (scrollbarWidth / division);

        setScrollWidth(newScrollWidth);
    }, [questions.length, scrollbarRef, questionsScrollBlockRef]);

    return (
        <div ref={scrollbarRef} id="scrollbar" className="scrollbar">
            <div
                ref={scrollRef}
                id="scroll"
                className="scroll"
                style={{
                    width: `${scrollWidth}%`,
                    transform: `translateX(${questionScrollPosition}px)`,
                }}
            ></div>
        </div>
    );
}
