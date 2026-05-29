import type { ScrollBackwardBtnProps } from "../../props/scrollBackwardBtnProps";
import QuestionBtn from "./QuestionBtn";

export default function ScrollBackwardBtn({ scrollBackward }: ScrollBackwardBtnProps) {
    return <QuestionBtn title={"<"} onClick={scrollBackward} />;
}
