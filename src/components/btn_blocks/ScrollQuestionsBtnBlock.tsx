import type { ScrollQuestionsBtnBlockProps } from "../../props/scrollQuestionsBtnBlockProps";
import ScrollBackwardBtn from "../buttons/ScrollBackwardBtn";
import { ScrollForwardBtn } from "../buttons/ScrollForwardBtn";
import ScrollToEndBtn from "../buttons/ScrollToEndBtn";
import ScrollToStartBtn from "../buttons/ScrollToStartBtn";

export default function ScrollQuestionsBtnBlock({
    position,
    fullScrollOnClick,
    partialScrollOnClick,
}: ScrollQuestionsBtnBlockProps) {
    return position == "start" ? (
        <div className="scroll-btn-block">
            <ScrollToStartBtn scrollToStart={fullScrollOnClick} />
            <ScrollBackwardBtn scrollBackward={partialScrollOnClick} />
        </div>
    ) : (
        <div className="scroll-btn-block">
            <ScrollForwardBtn scrollForward={partialScrollOnClick} />
            <ScrollToEndBtn scrollToEnd={fullScrollOnClick} />
        </div>
    );
}
