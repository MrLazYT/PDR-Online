import type { ScrollForwardBtnProps } from "../../props/scrollForwardBtnProps";
import QuestionBtn from "./QuestionBtn";

export function ScrollForwardBtn({ scrollForward }: ScrollForwardBtnProps) {
    return <QuestionBtn title={">"} onClick={scrollForward} />;
}
