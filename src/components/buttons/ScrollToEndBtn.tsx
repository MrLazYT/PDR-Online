import type { ScrollToEndBtnProps } from "../../props/scrollToEndBtnProps";
import QuestionBtn from "./QuestionBtn";

export default function ScrollToEndBtn({ scrollToEnd }: ScrollToEndBtnProps) {
    return <QuestionBtn title={">>"} onClick={scrollToEnd} />;
}
